import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Repository } from 'typeorm';
import { Label } from '../../entities/label.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { labelExceptionMessages } from './label.constants';
import { ResourcePaginationDto } from '../../common/dto/resource-pagination.dto';
import { LabelsResponse } from './dto/label-responses.dto';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async create(dto: CreateLabelDto) {
    const label = await this.findOne(dto.name);

    if (label) {
      throw new BadRequestException(labelExceptionMessages.labelExists);
    }

    const savedLabel = await this.labelRepository.save(dto);

    return savedLabel;
  }

  async findAll(query: ResourcePaginationDto): Promise<LabelsResponse> {
    const [labels, totalItems] = await this.labelRepository.findAndCount({
      order: { name: 'ASC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const totalPages = Math.ceil(totalItems / query.limit);

    return {
      labels,
      totalPages,
      currentPage: query.page,
      totalItems,
    };
  }

  async findOne(name: string) {
    return this.labelRepository.findOne({ where: { name } });
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return `This action updates a #${id} label`;
  }

  async remove(id: number) {
    return this.labelRepository.delete({ id });
  }
}
