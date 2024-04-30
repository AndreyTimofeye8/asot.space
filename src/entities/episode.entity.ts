import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';
import { AudioFile } from './audio-file.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  episode: string;

  @Column()
  date: Date;

  @Column({ length: 1000, nullable: true })
  youtube?: string;

  @OneToMany(() => Track, (track) => track.episode)
  tracks: Track[];

  @OneToMany(() => AudioFile, (audioFile) => audioFile.episode)
  audioFiles: AudioFile[];
}
