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
import { apiData } from '../common/constants';
import { trackApiData } from '../modules/tracks/track.constants';
import { Artist } from './artist.entity';
import { Label } from './label.entity';

@Entity()
export class Track {
  @ApiProperty({
    type: 'string',
    example: apiData.uuidIdExample,
    description: trackApiData.trackId,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    example: trackApiData.trackTitleExample,
    description: trackApiData.trackTitle,
  })
  @Column({ length: 300 })
  title: string;

  @ApiProperty({
    type: 'uuid',
    example: apiData.intIdExample,
    description: trackApiData.trackLabelId,
  })
  @Column({ type: 'uuid', nullable: false })
  labelId: string;

  @ManyToOne(() => Label, (label) => label.tracks)
  @JoinColumn({ name: 'label_id' })
  label: Label;

  @ManyToMany(() => Episode, (episode) => episode.tracks)
  @JoinTable({
    name: 'track_episode',
    joinColumn: { name: 'track_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'episode_id', referencedColumnName: 'id' },
  })
  episodes: Episode[];

  @ManyToMany(() => Artist, (artist) => artist.tracks)
  @JoinTable({
    name: 'track_artist',
    joinColumn: { name: 'track_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'id' },
  })
  artists: Artist[];
}
