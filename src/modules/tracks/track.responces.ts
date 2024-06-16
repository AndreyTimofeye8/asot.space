import { OmitType } from '@nestjs/swagger';
import { Track } from 'src/entities/track.entity';

export class TrackResponce extends OmitType(Track, ['episodeId']) {}
