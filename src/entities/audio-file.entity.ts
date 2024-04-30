import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Episode } from './episode.entity';

@Entity()
export class AudioFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  link?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  episodeId: string;

  @ManyToOne(() => Episode, (episode) => episode.audioFiles)
  @JoinColumn({ name: 'episodeId' })
  episode: Episode;
}
