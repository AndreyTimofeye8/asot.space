import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../../modules/users/dto/create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  // 'password',
] as const) {
  @ApiProperty({ type: 'string' })
  password: string;
}
