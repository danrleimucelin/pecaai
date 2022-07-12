import { Types } from 'mongoose';

import { AddressInterface } from './address.interface';
import { OrderItemInterface } from './item.interface';

export interface OrderInterface {
  _id?: string;
  user_id: string | Types.ObjectId;
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
