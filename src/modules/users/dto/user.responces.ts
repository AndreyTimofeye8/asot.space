import { ApiProperty } from '@nestjs/swagger';
import { userExceptionMessages } from '../user.constants';
import { HttpStatusText } from 'src/common/http.status';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundResponce {
  @ApiProperty({
    type: 'string',
    example: userExceptionMessages.userNotFound,
  })
  message: string;

  @ApiProperty({
    type: 'string',
    example: HttpStatusText[404],
  })
  error: string;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
}
