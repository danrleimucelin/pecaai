import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose'],
  });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.setGlobalPrefix('/api');

  await app.listen(3333);
}
bootstrap();
