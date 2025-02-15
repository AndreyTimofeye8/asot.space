import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { HttpStatusText } from '../../../common/http.status';
import { episodeApiData, episodeExceptionMessages } from '../episode.constants';
import { apiData } from '../../../common/constants';
import { TrackResponce } from '../../../modules/tracks/track.responces';
import { Episode } from '../../../entities/episode.entity';

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
    example: apiData.uuidIdExample,
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

export class EpisodesResponse {
  episodes: Episode[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
