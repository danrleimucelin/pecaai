import { UserInterface } from '../interfaces/user.interface';

export class User implements UserInterface {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  cpf?: string;
  cnpj?: string;
  admin: boolean;
}
