import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { authApiData } from './auth.constants';
// import { UsersService } from '../users/users.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: authApiData.registerUser })
  @Public()
  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiOperation({ summary: authApiData.loginUser })
  @Public()
  @Post('signin')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
