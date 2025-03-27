import { HttpStatus } from '@nestjs/common';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { HttpStatusText } from '../../common/http.status';
import { Track } from '../../entities/track.entity';
import { trackExceptionMessages } from './track.constants';
import { Award } from '../../entities/award.entity';

export class AwardName extends PickType(Award, ['name'] as const) {}

export class TrackResponse extends Track {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  number: number;

  award: AwardName;
}

export class TrackNotFoundResponse {
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
