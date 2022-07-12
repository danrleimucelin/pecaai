import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentAuthUser } from './entities/current-user';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CurrentAuthUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
