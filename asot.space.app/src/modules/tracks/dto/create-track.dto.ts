import { OmitType } from '@nestjs/swagger';
import { Track } from 'src/entities/track.entity';

export class CreateTrackDto extends OmitType(Track, ['id'] as const) {}
