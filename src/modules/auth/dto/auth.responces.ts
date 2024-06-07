import { ApiProperty } from '@nestjs/swagger';
import { authApiData, authExceptionMessages } from '../auth.constants';
import { userExceptionMessages } from '../../users/user.constants';
import { HttpStatus } from '@nestjs/common';
import { HttpStatusText } from 'src/common/http.status';

export class AuthCreatedResponce {
  @ApiProperty({ type: 'string', description: authApiData.bearerToken })
  token: string;
}

export class AuthUserExistResponce {
  @ApiProperty({
    type: 'string',
    example: userExceptionMessages.userAlreadyExist,
  })
  message: string;

  @ApiProperty({
    type: 'string',
    example: HttpStatusText[400],
  })
  error: string;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number;
}

export class AuthIncorrectLoginResponce {
  @ApiProperty({
    type: 'string',
    example: authExceptionMessages.incorrectLoginOrPassword,
  })
  message: string;

  @ApiProperty({
    type: 'string',
    example: HttpStatusText[400],
  })
  error: string;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number;
}
