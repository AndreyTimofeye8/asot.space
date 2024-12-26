import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ length: 100 })
  name: string;

  @ManyToMany(() => Track, (track) => track.artists)
  tracks: Track[];
}
