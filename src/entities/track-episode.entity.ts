import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Track } from './track.entity';
import { Episode } from './episode.entity';
import { Award } from './award.entity';
import { ApiProperty } from '@nestjs/swagger';
import { trackApiData } from '../modules/tracks/track.constants';

@Entity('')
export class TrackEpisode {
  @PrimaryColumn('uuid')
  track_id: string;

  @PrimaryColumn('uuid')
  episode_id: string;

  @ManyToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'track_id' })
  track: Track;

  @ManyToOne(() => Episode, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;

  @ManyToOne(() => Award, (award) => award.trackEpisodes, { nullable: true })
  @JoinColumn({ name: 'award_id' })
  award: Award;

  @Column({ type: 'int', nullable: true })
  awardId: number;

  @ApiProperty({
    type: 'number',
    example: trackApiData.trackNumberExample,
    description: trackApiData.trackNumber,
  })
  @Column('smallint')
  number: number;
}
