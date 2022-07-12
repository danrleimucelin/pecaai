import { AddressInterface } from '../interfaces/address.interface';
import { OrderItemInterface } from '../interfaces/item.interface';
import { OrderInterface } from '../interfaces/order.interface';

export class Order implements OrderInterface {
  _id?: string;
  user_id: string;
  dtm: Date;
  status: string;
  freight: number;
  discount: number;
  total: number;
  obs?: string;
  delivered_dtm?: Date;
  items: OrderItemInterface[];
  address?: AddressInterface;
}
