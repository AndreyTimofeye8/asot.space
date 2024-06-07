import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthCreatedResponce } from './dto/auth.responces';
import { LoginUserDto } from './dto/login-user.dto';
import { authExceptionMessages } from './auth.constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<AuthCreatedResponce> {
    const createdUser = await this.userService.create(createUserDto);
    const { id, login, email, role } = createdUser;
    const payload = { id, login, email, role };
    const token = this.generateToken(payload);

    return { token };
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<AuthCreatedResponce> {
    const { email, password } = loginUserDto;
    const requiredUser = await this.userService.findOneByEmail(email);

    if (!requiredUser) {
      throw new BadRequestException(
        authExceptionMessages.incorrectLoginOrPassword,
      );
    }

    const isValidPassword = await bcrypt.compare(
      password,
      requiredUser.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException(
        authExceptionMessages.incorrectLoginOrPassword,
      );
    }

    const { id, login, role } = requiredUser;
    const token = this.generateToken({ id, login, email, role });

    return { token };
  }

  generateToken(payload: JwtPayloadDto): string {
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRES_IN');

    return this.jwtService.sign({ payload }, { secret, expiresIn });
  }
}
