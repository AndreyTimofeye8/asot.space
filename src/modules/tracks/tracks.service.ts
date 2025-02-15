import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Track } from '../../entities/track.entity';
import { trackExceptionMessages } from './track.constants';
import { SuccessResponce } from '../../common/responces';
import { CreateTrackArtistDto } from './dto/create-track-artist.dto';
import { Artist } from '../../entities/artist.entity';
import { CreateAwardDto } from './dto/create-award.dto';
import { TrackEpisode } from '../../entities/track-episode.entity';
import { ResourcePaginationDto } from '../../common/dto/resource-pagination.dto';
import { TracksResponse } from './dto/track-responses.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(TrackEpisode)
    private readonly trackEpisodeRepository: Repository<TrackEpisode>,
  ) {}

  async create(createTrackDto: CreateTrackDto[]): Promise<Track[]> {
    const savedTracks = await this.trackRepository.save(createTrackDto);
    return savedTracks;
  }

  async findAll(query: ResourcePaginationDto): Promise<TracksResponse> {
    const [tracks, totalItems] = await this.trackRepository.findAndCount({
      order: { title: 'ASC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const totalPages = Math.ceil(totalItems / query.limit);

    return {
      tracks,
      totalPages,
      currentPage: query.page,
      totalItems,
    };
  }

  async findOne(id: string): Promise<Track> {
    const requiredTrack = await this.trackRepository.findOne({ where: { id } });

    if (!requiredTrack) {
      throw new NotFoundException(trackExceptionMessages.trackNotFound);
    }

    return requiredTrack;
  }

  async createTrackArtistRelation(dto: CreateTrackArtistDto) {
    const { trackId, artistIds } = dto;
    const track = await this.findOne(trackId);
    const artists = await this.artistRepository.findBy({
      id: In(artistIds),
    });

    track.artists = Array.isArray(track.artists)
      ? [...track.artists, ...artists]
      : [...artists];

    const updatedTrack = await this.trackRepository.save(track);

    return updatedTrack;
  }

  async createTrackNumberAndAward(dto: CreateAwardDto) {
    const { trackId, awardId, episodeId, trackNumber } = dto;
    const trackEpisode = await this.trackEpisodeRepository.findOne({
      where: { track_id: trackId, episode_id: episodeId },
    });

    if (!trackEpisode) {
      throw new NotFoundException('Track-Episode relation not found');
    }

    trackEpisode.awardId = awardId;
    trackEpisode.number = trackNumber;

    await this.trackEpisodeRepository.save(trackEpisode);

    return { message: 'Award  added to track-episode relation successfully' };
  }

  async findEpisodeTracks(id: string): Promise<Track[]> {
    const episodeTracks = await this.trackRepository.find({
      relations: ['episodes'],
      where: {
        episodes: {
          id: id,
        },
      },
    });

    return episodeTracks;
  }

  async update(
    trackId: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const { title, label } = updateTrackDto;
    const result = await this.trackRepository.update(
      { id: trackId },
      { title, label },
    );

    if (result.affected === 0) {
      throw new NotFoundException(trackExceptionMessages.trackNotFound);
    }

    return this.findOne(trackId);
  }

  async remove(id: string): Promise<SuccessResponce> {
    const result = await this.trackRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(trackExceptionMessages.trackNotFound);
    }

    return { success: true };
  }
}
