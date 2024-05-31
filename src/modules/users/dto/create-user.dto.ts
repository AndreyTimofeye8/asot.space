import { OmitType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class CreateUserDto extends OmitType(User, ['id', 'role'] as const) {}
