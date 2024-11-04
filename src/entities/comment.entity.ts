import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Episode } from './episode.entity';
import { User } from './user.entity';
import { Max, Min } from 'class-validator';
import { apiData } from '../common/constants';
import { episodeApiData } from '../modules/episodes/episode.constants';
import { usersApiData } from '../modules/users/user.constants';

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

  @ApiProperty({
    type: 'string',
    example: apiData.idExample,
    description: episodeApiData.episodeId,
  })
  @Column()
  episodeId: string;

  @ApiProperty({
    type: 'string',
    example: apiData.idExample,
    description: usersApiData.userId,
  })
  @Column()
  userId: string;

  @ManyToOne(() => Episode, (episode) => episode.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
