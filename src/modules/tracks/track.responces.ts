import { HttpStatus } from '@nestjs/common';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { HttpStatusText } from 'src/common/http.status';
import { Track } from 'src/entities/track.entity';
import { trackExceptionMessages } from './track.constants';

export class TrackResponce extends OmitType(Track, ['episodeId']) {}

export class TrackNotFoundResponce {
  @ApiProperty({
    type: 'string',
    example: trackExceptionMessages.trackNotFound,
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
