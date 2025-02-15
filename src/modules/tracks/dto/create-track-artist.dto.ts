import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { apiData } from '../../../common/constants';
import { trackApiData } from '../track.constants';

export class CreateTrackArtistDto {
  @ApiProperty({
    type: 'string',
    example: apiData.uuidIdExample,
    description: trackApiData.trackId,
  })
  trackId: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'integer' },
    example: [1, 2, 3],
    description: 'List of artist IDs to associate with the track',
  })
  @IsArray()
  @IsInt({ each: true })
  artistIds: number[];
}
