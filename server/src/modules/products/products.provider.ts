import { Connection } from 'mongoose';
import { ProductSchema } from './schemas/produtc.schema';

export const productsProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('products', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
