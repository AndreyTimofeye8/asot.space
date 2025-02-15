import { OmitType } from '@nestjs/swagger';
import { EpisodesResponse } from '../../episodes/dto/episode.responces';
import { Artist } from '../../../entities/artist.entity';

export class ArtistsResponse extends OmitType(EpisodesResponse, [
  'episodes',
] as const) {
  artists: Artist[];
}
