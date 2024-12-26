import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { userExceptionMessages } from './user.constants';
import { saltRounds } from '../auth/auth.constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, login } = createUserDto;

    await this.isUserExist(email);

    await this.isLoginExist(login);

    createUserDto.password = await this.hashPassword(password);

    const createdUser = await this.userRepository.save(createUserDto);

    if (!createdUser) {
      throw new BadRequestException(userExceptionMessages.userCreateFailed);
    }

    return createdUser;
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async isUserExist(email: string): Promise<void> {
    const foundedUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (foundedUser) {
      throw new BadRequestException(userExceptionMessages.userAlreadyExist);
    }
  }

  async isLoginExist(login: string): Promise<void> {
    const foundedLogin = await this.userRepository.findOne({
      where: { login },
    });

    if (foundedLogin) {
      throw new BadRequestException(userExceptionMessages.loginAlreadyExist);
    }
  }

  async findUserAccount(email: string) {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(userExceptionMessages.userNotFound);
    }

    const { password, ...accountData } = user;

    return accountData;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async updateUserAccount(email: string, dto: UpdateUserDto) {
    const account = await this.findUserAccount(email);
    account.login = dto.login;
    await this.userRepository.save(account);
    return this.findUserAccount(email);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
