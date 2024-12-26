import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { episodeApiData } from '../episode.constants';

export class CreateEpisodeTrackDto {
  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeExample,
    description: episodeApiData.episodeNumber,
  })
  episodeNumber: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'integer' },
    example: ['1', '2', '3'],
    description: 'List of track IDs to associate with the episode',
  })
  @IsArray()
  @IsString({ each: true })
  trackIds: string[];
}
