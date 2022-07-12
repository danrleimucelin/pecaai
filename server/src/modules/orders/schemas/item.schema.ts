import { Schema } from 'mongoose';

import { schemaOptions } from 'src/database/utils';

import { OrderItemInterface } from '../interfaces/item.interface';

const item = {
  product_id: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
} as any;

export const OrderItemSchema = new Schema<OrderItemInterface>(
  {
    ...item,
    additional_items: [item],
  },
  schemaOptions,
);
