import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from '../../entities/episode.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { episodeExceptionMessages } from './episode.constants';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto[]): Promise<Episode[]> {
    return this.episodeRepository.save(createEpisodeDto);
  }

  async findAll(): Promise<Episode[]> {
    return this.episodeRepository.find();
  }

  async findOne(id: string): Promise<Episode> {
    const episode = await this.episodeRepository.findOne({
      where: { id },
      relations: { tracks: true },
    });
    if (!episode) {
      throw new NotFoundException(episodeExceptionMessages.episodeNotFound);
    }
    return episode;
  }

  update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
