import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/entities/track.entity';
import { trackExceptionMessages } from './track.constants';
import { SuccessResponce } from 'src/common/responces';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto[]): Promise<Track[]> {
    const savedTracks = await this.trackRepository.save(createTrackDto);
    return savedTracks;
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const requiredTrack = await this.trackRepository.findOne({ where: { id } });

    if (!requiredTrack) {
      throw new NotFoundException(trackExceptionMessages.trackNotFound);
    }

    return requiredTrack;
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
    const { number, artist, title, label } = updateTrackDto;
    const result = await this.trackRepository.update(
      { id: trackId },
      { number, artist, title, label },
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
