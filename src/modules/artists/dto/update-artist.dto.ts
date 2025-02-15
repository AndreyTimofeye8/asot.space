import { PickType } from '@nestjs/swagger';
import { Artist } from '../../../entities/artist.entity';

export class UpdateArtistDto extends PickType(Artist, ['name'] as const) {}
