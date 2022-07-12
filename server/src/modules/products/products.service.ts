import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { OrdersService } from '../orders/orders.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductInterface } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private model: Model<ProductInterface>,
    private readonly orderSvc: OrdersService,
  ) {}

  create(data: CreateProductDto) {
    return this.model.create(data);
  }

  update(id: string, data: UpdateProductDto) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  remove(id: string) {
    return this.model.findByIdAndRemove(id);
  }

  get(id: string) {
    return this.model.findById(id);
  }

  async findAllAvailable(): Promise<ProductInterface[]> {
    const list = await this.model
      .find({
        active: true,
        $and: [
          { $or: [{ additional: true }, { price: { $gt: 0 } }] },
          {
            $or: [
              {
                control_stock: false,
              },
              { stock: { $gt: 0 } },
            ],
          },
        ],
      })
      .sort({ name: 1 });

    return list || [];
  }

  async findAll(): Promise<ProductInterface[]> {
    const list = await this.model
      .find()
      .sort({ active: -1, category: 1, name: 1 });

    return (list || []).map((product) => product.toJSON());
  }

  async findCategoryList() {
    const list = await this.model.distinct('category');

    return list?.filter((categ) => !!categ).sort() || [];
  }

  async findAdditionalList() {
    const list = await this.model.find({ additional: true }).sort({ name: 1 });

    return list || [];
  }

  async getGraphicsOrders() {
    const products = await this.findAll();
    const orders = await this.orderSvc.getList();

    const result = products.map((product) => {
      const ordersQuantity = orders.reduce(
        (orderAcc, orderCur) =>
          (orderAcc || 0) +
          orderCur.items.reduce(
            (acc, cur) =>
              (acc || 0) +
              (String(cur.product_id) === String(product._id)
                ? cur.quantity
                : 0),
            0,
          ),
        0,
      );

      return {
        ...product,
        ordersQuantity,
      };
    });

    return result;
  }
}
