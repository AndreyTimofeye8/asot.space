import { BadRequestException, Injectable } from '@nestjs/common';
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
    const { password, email } = createUserDto;

    await this.isUserExist(email);
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
