import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Tracklist {
  @PrimaryColumn()
  episode: number;

  @Column()
  number: number;

  @Column()
  artist: string;

  @Column()
  track: string;

  @Column()
  label?: string;
}
