import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DatabaseModule } from './database/database.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';
import { ProductsModule } from './modules/products/products.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    // }),
    DatabaseModule,

    UserAuthModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
