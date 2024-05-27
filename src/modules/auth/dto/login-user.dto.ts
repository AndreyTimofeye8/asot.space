import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/entities/user.entity';

export class LoginUserDto extends PickType(User, [
  'email',
  'password',
] as const) {}
