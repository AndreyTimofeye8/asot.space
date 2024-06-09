import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';
import { AudioFile } from './audio-file.entity';
import { ApiProperty } from '@nestjs/swagger';
import { apiData } from 'src/common/constants';
import { episodeApiData } from 'src/modules/episodes/episode.constants';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: 'string',
    example: apiData.idExample,
    description: episodeApiData.episodeId,
  })
  id: string;

  @Column()
  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeExample,
    description: episodeApiData.episodeNumber,
  })
  episode: string;

  @Column({
    type: 'date',
  })
  @ApiProperty({
    type: 'date',
    example: episodeApiData.episodeDateExample,
    description: episodeApiData.episodeDate,
  })
  date: Date;

  @Column({ length: 1000, nullable: true })
  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeYoutubeLinkExample,
    description: episodeApiData.episodeYoutubeLink,
    required: false,
  })
  youtube?: string;

  @OneToMany(() => Track, (track) => track.episode)
  tracks: Track[];

  @OneToMany(() => AudioFile, (audioFile) => audioFile.episode)
  audioFiles: AudioFile[];
}
