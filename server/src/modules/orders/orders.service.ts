import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderInterface } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL')
    private model: Model<OrderInterface>,
  ) {}

  create(data: CreateOrderDto) {
    return this.model.create(data);
  }

  remove(id: string) {
    return this.model.findByIdAndRemove(id);
  }

  get(id: string) {
    return this.model.findById(id);
  }

  async getList(user_id?: string): Promise<OrderInterface[]> {
    const list = await this.model
      .find({
        // user_id: !!user_id ? new Types.ObjectId(user_id) : undefined,
      })
      .sort({ dtm: -1 });

    return (list || []).map((order) => order.toJSON());
  }

  async getLastAddress() {
    const data = await this.model
      .findOne({
        'address.street': { $exists: true },
      })
      .select({ address: 1 })
      .sort({ dtm: -1 });

    return data?.address;
  }

  async getByLastMonth() {
    const data = await this.model
      .find({
        created_dtm: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      })
      .sort({ created_dtm: 1 });

    return data || [];
  }
}
