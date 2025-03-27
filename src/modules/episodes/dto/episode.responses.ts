import { HttpStatus } from '@nestjs/common';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { HttpStatusText } from '../../../common/http.status';
import { episodeApiData, episodeExceptionMessages } from '../episode.constants';
import { apiData } from '../../../common/constants';
import { TrackResponse } from '../../tracks/track.responses';
import { AudioFile } from '../../../entities/audio-file.entity';
import { User } from '../../../entities/user.entity';
import { Comment } from '../../../entities/comment.entity';
import { Rating } from '../../../entities/rating.entity';

export class EpisodeNotFoundResponse {
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

export class EpisodeOkResponse {
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
  date: Date;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeYoutubeLinkExample,
  })
  youtube?: string;

  @ApiProperty({
    type: 'string',
    example: episodeApiData.episodeImageLinkExample,
  })
  imageUrl?: string;

  @ApiProperty({
    type: TrackResponse,
    isArray: true,
  })
  tracks: TrackResponse[];

  audioFiles: AudioFile[];

  ratings: Rating[];

  comments: Comment[];

  users: User[];
}

export class ShortEpisodeResponse extends OmitType(EpisodeOkResponse, [
  'tracks',
] as const) {}

export class EpisodesResponse {
  @ApiProperty({ type: [ShortEpisodeResponse] })
  episodes: ShortEpisodeResponse[];

  @ApiProperty({ type: 'number' })
  totalPages: number;

  @ApiProperty({ type: 'number' })
  currentPage: number;

  @ApiProperty({ type: 'number' })
  totalItems: number;
}
