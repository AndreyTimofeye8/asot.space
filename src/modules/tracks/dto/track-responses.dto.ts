import { OmitType } from '@nestjs/swagger';
import { Track } from '../../../entities/track.entity';
import { EpisodesResponse } from '../../../modules/episodes/dto/episode.responces';

export class TracksResponse extends OmitType(EpisodesResponse, [
  'episodes',
] as const) {
  tracks: Track[];
}
