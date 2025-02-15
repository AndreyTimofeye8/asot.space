import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
import { Role } from '../common/enum/role.enum';
import {
  usersApiData,
  usersValidationMessages,
} from '../modules/users/user.constants';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { apiData } from 'src/common/constants';
import { Rating } from './rating.entity';
import { Comment } from './comment.entity';
import { Episode } from './episode.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: 'string',
    example: apiData.uuidIdExample,
    description: usersApiData.userId,
  })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString({ message: usersValidationMessages.incorrectLogin })
  @Length(3, 50, { message: usersValidationMessages.incorrectLogin })
  @ApiProperty({
    type: 'string',
    minLength: 3,
    maxLength: 50,
    example: usersApiData.userLoginExample,
    description: usersApiData.userLogin,
  })
  login: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail({}, { message: usersValidationMessages.incorrectEmail })
  @Length(6, 100, { message: usersValidationMessages.incorrectEmailLength })
  @ApiProperty({
    type: 'string',
    minLength: 6,
    maxLength: 100,
    example: usersApiData.userEmailExample,
    description: usersApiData.userEmail,
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: usersValidationMessages.incorrectPassword },
  )
  @Length(8, 30, { message: usersValidationMessages.incorrectPasswordLength })
  @ApiProperty({
    type: 'string',
    minLength: 8,
    maxLength: 30,
    example: usersApiData.userPasswordExample,
    description: usersApiData.userPassword,
  })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.user })
  @ApiProperty({ type: 'enum', enum: Role, description: usersApiData.userRole })
  role: Role;

  @OneToMany(() => Rating, (rating) => rating.episode)
  ratings: Rating[];

  @OneToMany(() => Comment, (comment) => comment.episode)
  comments: Comment[];

  @ManyToMany(() => Episode, (episode) => episode.users)
  @JoinTable({
    name: 'user_episode',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'episode_id', referencedColumnName: 'id' },
  })
  episodes: Episode[];
}
