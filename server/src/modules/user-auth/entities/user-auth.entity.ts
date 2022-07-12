import { User } from 'src/modules/users/entities/user.entity';

export class UserAuth {
  access_token: string;
  user: User;
}
