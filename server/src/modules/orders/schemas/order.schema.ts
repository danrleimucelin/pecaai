import { Schema } from 'mongoose';

import { schemaOptions } from 'src/database/utils';

import { OrderInterface } from '../interfaces/order.interface';
import { AddressSchema } from './address.schema';
import { OrderItemSchema } from './item.schema';

export const OrderSchema = new Schema<OrderInterface>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    dtm: { type: Date, default: Date.now },
    status: { type: String, default: 'PENDING' },
    freight: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    obs: String,
    delivered_dtm: Date,
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
  },
  schemaOptions,
);
