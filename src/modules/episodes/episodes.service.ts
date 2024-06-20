import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from '../../entities/episode.entity';
import { Repository } from 'typeorm';
import { episodeExceptionMessages } from './episode.constants';
import { SuccessResponce } from 'src/common/responces';

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

  async update(
    episodeId: string,
    updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<Episode> {
    const { episode, date, youtube } = updateEpisodeDto;
    const result = await this.episodeRepository.update(
      { id: episodeId },
      { episode, date, youtube },
    );

    if (result.affected === 0) {
      throw new NotFoundException(episodeExceptionMessages.episodeNotFound);
    }

    return this.findOne(episodeId);
  }

  async remove(id: string): Promise<SuccessResponce> {
    const result = await this.episodeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(episodeExceptionMessages.episodeNotFound);
    }

    return { success: true };
  }
}
