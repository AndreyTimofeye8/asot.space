import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Episode } from './episode.entity';
import { ApiProperty } from '@nestjs/swagger';
import { apiData } from 'src/common/constants';
import { trackApiData } from 'src/modules/tracks/track.constants';
import { episodeApiData } from 'src/modules/episodes/episode.constants';

@Entity()
export class Track {
  @ApiProperty({
    type: 'string',
    example: apiData.idExample,
    description: trackApiData.trackId,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'number',
    example: trackApiData.trackNumberExample,
    description: trackApiData.trackNumber,
  })
  @Column('smallint')
  number: number;

  @ApiProperty({
    type: 'string',
    example: trackApiData.trackArtistExample,
    description: trackApiData.trackArtist,
  })
  @Column({ length: 100 })
  artist: string;

  @ApiProperty({
    type: 'string',
    example: trackApiData.trackTitleExample,
    description: trackApiData.trackTitle,
  })
  @Column({ length: 300 })
  title: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: trackApiData.trackLabelExample,
    description: trackApiData.trackLabel,
  })
  @Column({ length: 100, nullable: true })
  label?: string;

  @ManyToMany(() => Episode, (episode) => episode.tracks)
  @JoinTable({
    name: 'track_episodes',
    joinColumn: { name: 'track_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'episode_id', referencedColumnName: 'id' },
  })
  episodes: Episode[];
}
