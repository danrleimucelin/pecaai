import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private model: Model<UserInterface>,
  ) {}

  async create(data: CreateUserDto) {
    const { password, ...rest } = data;

    return this.model.create({
      ...rest,
      password: await hashSync(password, 10),
    });
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, data: UpdateUserDto) {
    return this.model.findByIdAndUpdate(id, data);
  }

  remove(id: string) {
    return this.model.findByIdAndRemove(id);
  }

  async getByLastMonth() {
    const data = await this.model
      .find({
        created_dtm: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      })
      .sort({ created_dtm: 1 });

    return data || [];
  }
}
