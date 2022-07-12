import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { Model } from 'mongoose';
import { UserInterface } from '../users/interfaces/user.interface';
import { UserAuth } from './entities/user-auth.entity';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject('USER_MODEL')
    private model: Model<UserInterface>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<UserAuth> {
    const user = await this.model.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    const access_token = this.jwtService.sign({ id: user.id });

    return { access_token, user };
  }

  async reLogin(id: string): Promise<UserAuth> {
    const user = await this.model.findById(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const access_token = this.jwtService.sign({ id });

    return { access_token, user };
  }
}
