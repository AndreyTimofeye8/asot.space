import { OmitType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class JwtPayloadDto extends OmitType(User, [
  'password',
  'comments',
  'ratings',
  'episodes',
] as const) {}
