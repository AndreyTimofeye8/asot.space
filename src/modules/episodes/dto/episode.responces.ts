import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { HttpStatusText } from 'src/common/http.status';
import { episodeApiData, episodeExceptionMessages } from '../episode.constants';
import { apiData } from 'src/common/constants';
import { TrackResponce } from 'src/modules/tracks/track.responces';

export class EpisodeNotFoundResponce {
  @ApiProperty({
    type: 'string',
    example: episodeExceptionMessages.episodeNotFound,
  })
  message: string;

  @ApiProperty({
    type: 'string',
    example: HttpStatusText[404],
  })
  error: string;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
}

export class EpisodeOkResponce {
  @ApiProperty({
    type: 'string',
    example: apiData.idExample,
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeExample,
  })
  episode: string;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeDateExample,
  })
  date: string;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeYoutubeLinkExample,
  })
  youtube: string;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeImageLinkExample,
  })
  imageUrl: string;

  @ApiProperty({
    type: TrackResponce,
    isArray: true,
  })
  tracks: TrackResponce[];
}
