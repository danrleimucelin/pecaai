import { Schema } from 'mongoose';

import { schemaOptions } from 'src/database/utils';

import { AddressInterface } from '../interfaces/address.interface';

export const AddressSchema = new Schema<AddressInterface>(
  {
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: String,
    district: String,
    city: { type: String },
    state: { type: String },
    zipcode: String,
  },
  schemaOptions,
);
