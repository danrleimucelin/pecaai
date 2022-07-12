import { ProductInterface } from '../interfaces/product.interface';

export class Product implements ProductInterface {
  _id?: string;
  name: string;
  description?: string;
  obs?: string;
  img_link: string;
  price: number;
  promotional_price: number;
  unit: string;
  category: string;
  stock: number;
  control_stock: boolean;
  additional: boolean;
  additional_max_qty: number;
  additional_product_list: string[];
  active: boolean;
}
