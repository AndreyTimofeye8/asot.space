import { PickType } from '@nestjs/swagger';
import { Episode } from '../../../entities/episode.entity';

export class CreateEpisodeDto extends PickType(Episode, [
  'episode',
  'date',
  'imageUrl',
  'youtube',
] as const) {}
