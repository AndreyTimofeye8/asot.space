import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../../common/decorator/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { authApiData } from './auth.constants';
import {
  AuthUserExistResponse,
  AuthCreatedResponse,
  AuthIncorrectLoginResponse,
} from './dto/auth.responces';

@ApiTags('Authentication')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: authApiData.registerAccount })
  @ApiCreatedResponse({ type: AuthCreatedResponse })
  @ApiBadRequestResponse({ type: AuthUserExistResponse })
  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiOperation({ summary: authApiData.loginUser })
  @ApiCreatedResponse({ type: AuthCreatedResponse })
  @ApiBadRequestResponse({ type: AuthIncorrectLoginResponse })
  @Post('signin')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
