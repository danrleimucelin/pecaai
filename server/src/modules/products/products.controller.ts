import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { Public } from '../user-auth/constants';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() data: CreateProductDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Public()
  @Get('available')
  findAllAvailable() {
    return this.service.findAllAvailable();
  }

  @Public()
  @Get('admin')
  findAll() {
    return this.service.findAll();
  }

  @Get('categories')
  findCategoryList() {
    return this.service.findCategoryList();
  }

  @Get('additionals')
  findAdditionalList() {
    return this.service.findAdditionalList();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Get('graphics/orders')
  getGraphicsOrders() {
    return this.service.getGraphicsOrders();
  }
}
