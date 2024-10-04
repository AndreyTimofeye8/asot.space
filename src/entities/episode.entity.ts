import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Track } from './track.entity';
import { AudioFile } from './audio-file.entity';
import { ApiProperty } from '@nestjs/swagger';
import { apiData } from 'src/common/constants';
import { episodeApiData } from 'src/modules/episodes/episode.constants';
import { Rating } from './rating.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity()
export class Episode {
  @ApiProperty({
    type: 'string',
    example: apiData.idExample,
    description: episodeApiData.episodeId,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeExample,
    description: episodeApiData.episodeNumber,
  })
  @Column()
  episode: string;

  @ApiProperty({
    type: 'date',
    example: episodeApiData.episodeDateExample,
    description: episodeApiData.episodeDate,
  })
  @Column({
    type: 'date',
  })
  date: Date;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeYoutubeLinkExample,
    description: episodeApiData.episodeYoutubeLink,
    required: false,
  })
  @Column({ length: 1000, nullable: true })
  youtube?: string;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeImageLinkExample,
    description: episodeApiData.episodeImageLink,
    required: false,
  })
  @Column({ length: 1000, nullable: true })
  imageUrl?: string;

  @OneToMany(() => Track, (track) => track.episode)
  tracks: Track[];

  @OneToMany(() => AudioFile, (audioFile) => audioFile.episode)
  audioFiles: AudioFile[];

  @OneToMany(() => Rating, (rating) => rating.episode)
  ratings: Rating[];

  @OneToMany(() => Comment, (comment) => comment.episode)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.episodes)
  users: User[];
}
