import { ApiProperty } from '@nestjs/swagger';

export class AuthResponce {
  @ApiProperty({ type: 'string' })
  token: string;
}
