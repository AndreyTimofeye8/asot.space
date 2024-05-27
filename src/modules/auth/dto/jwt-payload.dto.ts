import { OmitType } from '@nestjs/mapped-types';
import { User } from 'src/entities/user.entity';

export class JwtPayloadDto extends OmitType(User, ['password'] as const) {}
