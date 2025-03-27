import { OmitType } from '@nestjs/swagger';
import { User } from '../../../entities/user.entity';

export class JwtPayloadDto extends OmitType(User, [
  'password',
  'comments',
  'ratings',
  'episodes',
] as const) {}
