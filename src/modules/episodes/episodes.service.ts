import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from '../../entities/episode.entity';
import { Between, In, Repository } from 'typeorm';
import { episodeExceptionMessages } from './episode.constants';
import { SuccessResponce } from '../../common/responces';
import { CreateEpisodeTrackDto } from './dto/create-episode-track.dto';
import { Track } from '../../entities/track.entity';
import { TrackEpisode } from '../../entities/track-episode.entity';
import { ResourcePaginationDto } from '../../common/dto/resource-pagination.dto';
import { EpisodesResponse } from './dto/episode.responses';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
    @InjectRepository(TrackEpisode)
    private readonly trackEpisodeRepository: Repository<TrackEpisode>,
    private readonly cacheService: CacheService,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto[]): Promise<Episode[]> {
    const episodes = await this.episodeRepository.find();
    const episodeIds = episodes.map((episode) => episode.episode);

    for (const episode of createEpisodeDto) {
      if (episodeIds.includes(episode.episode)) {
        throw new BadRequestException('Episode already exists');
      }
    }

    return this.episodeRepository.save(createEpisodeDto);
  }

  async createEpisodeTrackRelation(dto: CreateEpisodeTrackDto) {
    const { episodeNumber, trackIds } = dto;
    const episode = await this.findOneById(episodeNumber);
    const tracks = await this.trackRepository.findBy({ id: In(trackIds) });

    episode.tracks = Array.isArray(episode.tracks)
      ? [...episode.tracks, ...tracks]
      : [...tracks];

    await this.episodeRepository.save(episode);

    return this.episodeRepository.findOne({
      where: { episode: episodeNumber },
      relations: ['tracks'],
    });
  }

  async findAll(
    query: ResourcePaginationDto,
    year?: number,
  ): Promise<EpisodesResponse> {
    const cacheKey = `episodes:${query.page}:${query.limit}:${year || ''}`;
    const cachedData = await this.cacheService.get<EpisodesResponse>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const where: any = {};

    if (year) {
      const startDate = `${year}-01-01`;
      const endDate = `${year + 1}-01-01`;
      where.date = Between(startDate, endDate);
    }

    const [episodes, totalItems] = await this.episodeRepository.findAndCount({
      where,
      order: { date: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const totalPages = Math.ceil(totalItems / query.limit);

    const response: EpisodesResponse = {
      episodes,
      totalPages,
      currentPage: query.page,
      totalItems,
    };

    await this.cacheService.set(cacheKey, response, 3600000);

    return response;
  }

  async findOneById(numberId: string): Promise<Episode> {
    const episode = await this.episodeRepository.findOne({
      where: { episode: numberId },
      relations: ['tracks', 'tracks.artists', 'tracks.label'],
      select: {
        id: true,
        episode: true,
        date: true,
        youtube: true,
        imageUrl: true,
        tracks: {
          id: true,
          title: true,
          artists: {
            id: true,
            name: true,
          },
          label: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!episode) {
      throw new NotFoundException(episodeExceptionMessages.episodeNotFound);
    }

    const episodeTracks = await this.trackEpisodeRepository
      .createQueryBuilder('te')
      .leftJoinAndSelect('te.track', 'track')
      .leftJoinAndSelect('te.award', 'award')
      .where('te.episode_id = :episodeId', { episodeId: episode.id })
      .getMany();

    episode.tracks = episode.tracks.map((track) => {
      const trackEpisode = episodeTracks.find((te) => te.track.id === track.id);

      if (trackEpisode) {
        track['number'] = trackEpisode.number;
        track['award'] = trackEpisode?.award
          ? {
              name: trackEpisode.award.name,
              description: trackEpisode.award.description,
            }
          : null;
      }

      return track;
    });

    return episode;
  }

  async update(
    episodeId: string,
    updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<Episode> {
    const { episode, date, youtube, imageUrl } = updateEpisodeDto;
    const result = await this.episodeRepository.update(
      { id: episodeId },
      { episode, date, youtube, imageUrl },
    );

    if (result.affected === 0) {
      throw new NotFoundException(episodeExceptionMessages.episodeNotFound);
    }

    await this.cacheService.delKeysWithPrefix('episodes');

    return this.episodeRepository.findOne({ where: { id: episodeId } });
  }

  async remove(id: string): Promise<SuccessResponce> {
    const result = await this.episodeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(episodeExceptionMessages.episodeNotFound);
    }

    await this.cacheService.delKeysWithPrefix('episodes');

    return { success: true };
  }
}
