import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.provider';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
})
export class ProductsModule {}
