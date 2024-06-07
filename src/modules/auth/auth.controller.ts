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
  AuthUserExistResponce,
  AuthCreatedResponce,
  AuthIncorrectLoginResponce,
} from './dto/auth.responces';
// import { UsersService } from '../users/users.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: authApiData.registerUser })
  @ApiCreatedResponse({ type: AuthCreatedResponce })
  @ApiBadRequestResponse({ type: AuthUserExistResponce })
  @Public()
  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiOperation({ summary: authApiData.loginUser })
  @ApiCreatedResponse({ type: AuthCreatedResponce })
  @ApiBadRequestResponse({ type: AuthIncorrectLoginResponce })
  @Public()
  @Post('signin')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
