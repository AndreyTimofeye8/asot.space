import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artistApiData } from './artists.constants';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResourcePaginationDto } from '../../common/dto/resource-pagination.dto';
import { ArtistsResponse } from './dto/artist-responses.dto';
import { Artist } from '../../entities/artist.entity';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '../../common/enum/role.enum';
import { SuccessResponce } from '../../common/responces';

@ApiTags(artistApiData.artistsTag)
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({ summary: artistApiData.createArtist })
  @ApiCreatedResponse({ type: Artist })
  @Post()
  @Roles(Role.admin)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({ type: [ArtistsResponse] })
  findAll(@Query() query: ResourcePaginationDto) {
    return this.artistsService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(+id, updateArtistDto);
  }

  @ApiOperation({ summary: artistApiData.deleteArtist })
  @ApiOkResponse({ type: SuccessResponce })
  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id') id: string) {
    return this.artistsService.remove(+id);
  }
}
