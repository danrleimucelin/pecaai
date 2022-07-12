import { Connection } from 'mongoose';

import { OrderSchema } from './schemas/order.schema';

export const ordersProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('orders', OrderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
