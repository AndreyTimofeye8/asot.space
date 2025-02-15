import { PickType } from '@nestjs/swagger';
import { Label } from '../../../entities/label.entity';

export class CreateLabelDto extends PickType(Label, ['name'] as const) {}
