import { OmitType } from '@nestjs/swagger';
import { Episode } from 'src/entities/episode.entity';

export class CreateEpisodeDto extends OmitType(Episode, ['id'] as const) {}
