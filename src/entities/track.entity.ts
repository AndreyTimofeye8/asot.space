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
import { Artist } from './artist.entity';
import { Label } from './label.entity';

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
    type: 'uuid',
    example: apiData.idExample,
    description: trackApiData.trackLabelId,
  })
  @Column({ type: 'uuid', nullable: false })
  labelId: string;

  @ManyToOne(() => Label, (label) => label.tracks)
  @JoinColumn({ name: 'label_id' })
  label: Label;

  @ManyToMany(() => Episode, (episode) => episode.tracks)
  @JoinTable({
    name: 'track_episodes',
    joinColumn: { name: 'track_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'episode_id', referencedColumnName: 'id' },
  })
  episodes: Episode[];

  @ManyToMany(() => Artist, (artist) => artist.tracks)
  @JoinTable({
    name: 'track_artists',
    joinColumn: { name: 'track_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'id' },
  })
  artists: Artist[];
}
