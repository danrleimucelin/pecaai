import {
  Body,
  Controller,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { UserAuthService } from './user-auth.service';
import { UserAuth } from './entities/user-auth.entity';
import { Public } from './constants';
import { CurrentUser } from './current-user.anote';
import { CurrentAuthUser } from './entities/current-user';
import { UserLogin } from './dto/login.dto';

@Controller('users')
export class UserAuthController {
  constructor(private readonly service: UserAuthService) {}

  @Public()
  @Post('login')
  async loginUser(@Body() data: UserLogin): Promise<UserAuth> {
    const { email, password } = data;

    if (email.length > 320 || password.length > 100) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const userToken = await this.service.login(email, password);

    return userToken;
  }

  @Post('relogin')
  async reLoginUser(@CurrentUser() user: CurrentAuthUser): Promise<UserAuth> {
    const userToken = await this.service.reLogin(user.authUserId);

    return userToken;
  }
}
