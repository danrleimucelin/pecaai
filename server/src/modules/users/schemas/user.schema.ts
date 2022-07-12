import { Schema } from 'mongoose';
import { schemaOptions } from 'src/database/utils';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    password: String,
    cpf: String,
    cnpj: String,
    admin: { type: Boolean, required: true, default: false },
  },
  schemaOptions,
);
