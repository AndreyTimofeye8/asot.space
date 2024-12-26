import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrackEpisode } from './track-episode.entity';

@Entity()
export class Award {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => TrackEpisode, (trackEpisode) => trackEpisode.award)
  trackEpisodes: TrackEpisode[];
}
