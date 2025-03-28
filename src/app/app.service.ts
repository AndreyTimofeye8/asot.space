import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from '../entities/episode.entity';
import { episodeExceptionMessages } from '../modules/episodes/episode.constants';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findEpisodeByNumber(episodeNumber: string): Promise<Episode> {
    const foundedEpisode = await this.episodeRepository.findOne({
      where: { episode: episodeNumber },
      relations: { tracks: true },
    });

    if (!foundedEpisode) {
      throw new NotFoundException(episodeExceptionMessages.episodeNotFound);
    }

    return foundedEpisode;
  }
}
