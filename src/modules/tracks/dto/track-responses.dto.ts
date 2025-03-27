import { OmitType } from '@nestjs/swagger';
import { Track } from '../../../entities/track.entity';
import { EpisodesResponse } from '../../episodes/dto/episode.responses';

export class TracksResponse extends OmitType(EpisodesResponse, [
  'episodes',
] as const) {
  tracks: Track[];
}
