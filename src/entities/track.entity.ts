import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Episode } from './episode.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint')
  number: number;

  @Column({ length: 100 })
  artist: string;

  @Column({ length: 300 })
  title: string;

  @Column({ length: 100, nullable: true })
  label?: string;

  @Column({ select: false })
  episodeId: string;

  @ManyToOne(() => Episode, (episode) => episode.tracks)
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;
}
