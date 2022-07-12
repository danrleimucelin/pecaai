import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth-guard';
import { JwtStrategy } from './jwt.strategy';
import { usersProviders } from '../users/users.provider';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserAuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
    UserAuthService,
    ...usersProviders,
  ],
  // exports: [UserAuthService],
})
export class UserAuthModule {}
