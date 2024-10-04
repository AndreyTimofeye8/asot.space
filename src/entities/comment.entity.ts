import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Episode } from './episode.entity';
import { User } from './user.entity';
import { Max, Min } from 'class-validator';

@Entity()
export class Comment {
  @ApiProperty({ type: 'number', example: '1' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ type: 'string', minimum: 3, maximum: 500 })
  @Min(3)
  @Max(500)
  @Column({ type: 'varchar', nullable: false })
  content: string;

  @ApiProperty({ type: 'date' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Episode, (episode) => episode.comments, {
    onDelete: 'CASCADE',
  })
  episode: Episode;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;
}
