import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponce {
  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  success: boolean;
}
