import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';
import { ApiProperty } from '@nestjs/swagger';
import { apiData } from 'src/common/constants';
import { labelApiData } from 'src/modules/labels/label.constants';

@Entity()
export class Label {
  @ApiProperty({
    type: 'string',
    example: apiData.intIdExample,
    description: labelApiData.labelId,
  })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({
    type: 'string',
    example: labelApiData.labelNameExample,
    description: labelApiData.labelName,
  })
  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Track, (track) => track.label)
  tracks: Track[];
}
