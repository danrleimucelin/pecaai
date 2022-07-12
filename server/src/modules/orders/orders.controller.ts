import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { CurrentUser } from '../user-auth/current-user.anote';
import { CurrentAuthUser } from '../user-auth/entities/current-user';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderInterface } from './interfaces/order.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Body() data: CreateOrderDto, @CurrentUser() user: CurrentAuthUser) {
    return this.service.create({
      ...data,
      user_id: user.authUserId,
      status: 'PENDING',
    });
  }

  @Get('list')
  getList(@CurrentUser() user: CurrentAuthUser): Promise<OrderInterface[]> {
    return this.service.getList(user.isAdmin ? null : user.authUserId);
  }

  @Get('address/last')
  getLastAddress() {
    return this.service.getLastAddress();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('graphics/last/month')
  getGraphicsOrders() {
    return this.service.getByLastMonth();
  }
}
