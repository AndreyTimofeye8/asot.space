import { OmitType } from '@nestjs/swagger';
import { EpisodesResponse } from '../../episodes/dto/episode.responses';
import { Label } from 'src/entities/label.entity';

export class LabelsResponse extends OmitType(EpisodesResponse, [
  'episodes',
] as const) {
  labels: Label[];
}
