import { AddressInterface } from '../interfaces/address.interface';
import { OrderItemInterface } from '../interfaces/item.interface';
import { OrderInterface } from '../interfaces/order.interface';

export class CreateOrderDto implements OrderInterface {
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
