import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { apiData } from '../../../common/constants';
import { trackApiData } from '../track.constants';
import { episodeApiData } from 'src/modules/episodes/episode.constants';

export class CreateAwardDto {
  @ApiProperty({
    type: 'string',
    example: apiData.uuidIdExample,
    description: episodeApiData.episodeId,
  })
  episodeId: string;

  @ApiProperty({
    type: 'string',
    example: apiData.uuidIdExample,
    description: trackApiData.trackId,
  })
  trackId: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Award ID',
  })
  @IsInt()
  awardId: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Track number',
  })
  @IsInt()
  trackNumber: number;
}
