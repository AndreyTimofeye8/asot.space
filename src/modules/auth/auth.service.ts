import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthResponce } from './dto/auth.responce';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<AuthResponce> {
    const createdUser = await this.userService.create(createUserDto);
    const { id, login, email, role } = createdUser;
    const payload = { id, login, email, role };
    // const token = this.generateToken(payload);
    const token = this.generateToken(payload);
    return { token };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    return loginUserDto;
  }

  generateToken(payload: JwtPayloadDto) {
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRES_IN');
    return this.jwtService.sign({ payload }, { secret, expiresIn });
  }
}
