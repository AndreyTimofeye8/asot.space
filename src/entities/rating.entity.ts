import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Episode } from './episode.entity';
import { User } from './user.entity';

@Entity()
export class Rating {
  @ApiProperty({ type: 'number', example: '1' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ type: 'number', minimum: 1, maximum: 5 })
  @Min(1)
  @Max(5)
  @Column({ type: 'smallint', nullable: false })
  value: number;

  @ManyToOne(() => Episode, (episode) => episode.ratings, {
    onDelete: 'CASCADE',
  })
  episode: Episode;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  user: User;
}
