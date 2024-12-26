import { ApiProperty } from '@nestjs/swagger';
import { authApiData, authExceptionMessages } from '../auth.constants';
import { userExceptionMessages } from '../../users/user.constants';
import { HttpStatus } from '@nestjs/common';
import { HttpStatusText } from '../../../common/http.status';

export class AuthCreatedResponse {
  @ApiProperty({ type: 'string', description: authApiData.bearerToken })
  accessToken: string;
}

export class UnauthorizedResponse {
  @ApiProperty({ type: 'string', example: authExceptionMessages.unauthorized })
  message: string;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
}

export class ForbiddenResponse {
  @ApiProperty({ type: 'string', example: authExceptionMessages.forbidden })
  message: string;

  @ApiProperty({
    type: 'string',
    example: HttpStatusText[403],
  })
  error: string;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.FORBIDDEN,
  })
  statusCode: number;
}

export class AuthUserExistResponse {
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

export class AuthIncorrectLoginResponse {
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
