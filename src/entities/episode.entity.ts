import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';
import { AudioFile } from './audio-file.entity';
import { ApiProperty } from '@nestjs/swagger';
import { apiData } from 'src/common/constants';
import { episodeApiData } from 'src/modules/episodes/episode.constants';

@Entity()
export class Episode {
  @ApiProperty({
    type: 'string',
    example: apiData.idExample,
    description: episodeApiData.episodeId,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeExample,
    description: episodeApiData.episodeNumber,
  })
  @Column()
  episode: string;

  @ApiProperty({
    type: 'date',
    example: episodeApiData.episodeDateExample,
    description: episodeApiData.episodeDate,
  })
  @Column({
    type: 'date',
  })
  date: Date;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeYoutubeLinkExample,
    description: episodeApiData.episodeYoutubeLink,
    required: false,
  })
  @Column({ length: 1000, nullable: true })
  youtube?: string;

  @OneToMany(() => Track, (track) => track.episode)
  tracks: Track[];

  @OneToMany(() => AudioFile, (audioFile) => audioFile.episode)
  audioFiles: AudioFile[];
}
