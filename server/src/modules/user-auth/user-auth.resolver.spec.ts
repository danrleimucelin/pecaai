import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';

describe('UserAuthResolver', () => {
  let resolver: UserAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAuthController, UserAuthService],
    }).compile();

    resolver = module.get<UserAuthController>(UserAuthController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
