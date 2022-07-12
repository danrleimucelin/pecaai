import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ordersProviders } from './orders.provider';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders],
  exports: [OrdersService],
})
export class OrdersModule {}
