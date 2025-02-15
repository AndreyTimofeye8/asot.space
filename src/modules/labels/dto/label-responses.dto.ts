import { OmitType } from '@nestjs/swagger';
import { EpisodesResponse } from '../../episodes/dto/episode.responces';
import { Label } from 'src/entities/label.entity';

export class LabelsResponse extends OmitType(EpisodesResponse, [
  'episodes',
] as const) {
  labels: Label[];
}
