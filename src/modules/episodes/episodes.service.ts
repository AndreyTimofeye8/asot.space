import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from '../../entities/episode.entity';
import { In, Repository } from 'typeorm';
import { episodeExceptionMessages } from './episode.constants';
import { SuccessResponce } from '../../common/responces';
import { CreateEpisodeTrackDto } from './dto/create-episode-track.dto';
import { Track } from '../../entities/track.entity';
import { TrackEpisode } from 'src/entities/track-episode.entity';
import { ResourcePaginationDto } from '../../common/dto/resource-pagination.dto';
import { EpisodesResponse } from './dto/episode.responces';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
    @InjectRepository(TrackEpisode)
    private readonly trackEpisodeRepository: Repository<TrackEpisode>,
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

  async findAll(query: ResourcePaginationDto): Promise<EpisodesResponse> {
    const [episodes, totalItems] = await this.episodeRepository.findAndCount({
      order: { date: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const totalPages = Math.ceil(totalItems / query.limit);

    return {
      episodes,
      totalPages,
      currentPage: query.page,
      totalItems,
    };
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

    return this.findOneById(episodeId);
  }

  async remove(id: string): Promise<SuccessResponce> {
    const result = await this.episodeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(episodeExceptionMessages.episodeNotFound);
    }

    return { success: true };
  }
}
