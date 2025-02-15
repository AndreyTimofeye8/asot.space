import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsResponse } from './dto/artist-responses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../../entities/artist.entity';
import { Repository } from 'typeorm';
import { ResourcePaginationDto } from '../../common/dto/resource-pagination.dto';
import { artistExceptionMessages } from './artists.constants';
import { SuccessResponce } from 'src/common/responces';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto) {
    const artist = await this.findOne(dto.name);

    if (artist) {
      throw new BadRequestException(artistExceptionMessages.artistExists);
    }

    const savedArtist = await this.artistRepository.save(dto);

    return savedArtist;
  }

  async findAll(query: ResourcePaginationDto): Promise<ArtistsResponse> {
    const [artists, totalItems] = await this.artistRepository.findAndCount({
      order: { name: 'ASC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const totalPages = Math.ceil(totalItems / query.limit);

    return {
      artists,
      totalPages,
      currentPage: query.page,
      totalItems,
    };
  }

  async findOne(name: string) {
    return this.artistRepository.findOne({ where: { name } });
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  async remove(id: number): Promise<SuccessResponce> {
    await this.artistRepository.delete({ id });

    return { success: true };
  }
}
