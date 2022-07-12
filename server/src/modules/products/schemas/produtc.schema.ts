import { Schema } from 'mongoose';

import { schemaOptions } from 'src/database/utils';

import { ProductInterface } from '../interfaces/product.interface';

export const ProductSchema = new Schema<ProductInterface>(
  {
    name: { type: String, required: true },
    description: String,
    obs: String,
    img_link: String,
    price: { type: Number },
    promotional_price: Number,
    category: String,
    stock: { type: Number, default: 0 },
    control_stock: { type: Boolean, default: false },
    additional: { type: Boolean, default: false },
    additional_max_qty: { type: Number, default: 0 },
    additional_product_list: [{ type: Schema.Types.ObjectId, ref: 'products' }],
    active: { type: Boolean, required: true, default: false },
  },
  schemaOptions,
);
