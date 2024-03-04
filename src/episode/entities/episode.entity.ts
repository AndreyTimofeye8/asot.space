import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Episode {
  @PrimaryColumn()
  episode: number;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column()
  file: string;

  @Column()
  youtube: string;
}
