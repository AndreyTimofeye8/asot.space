import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBody,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Public } from '../../common/decorator/public.decorator';
import { episodeApiData } from './episode.constants';
import { Episode } from '../../entities/episode.entity';
import {
  ForbiddenResponse,
  UnauthorizedResponse,
} from '../auth/dto/auth.responces';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { apiData } from 'src/common/constants';
import {
  EpisodeNotFoundResponce,
  EpisodeOkResponce,
} from './dto/episode.responces';
import { SuccessResponce } from 'src/common/responces';

@ApiTags(episodeApiData.episodesTag)
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodeService: EpisodesService) {}

  @ApiOperation({ summary: episodeApiData.createEpisode })
  @ApiCreatedResponse({ type: Episode, isArray: true })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiBody({ type: [CreateEpisodeDto] })
  @Post()
  @Roles(Role.admin)
  create(
    @Body()
    createEpisodeDto: CreateEpisodeDto[],
  ) {
    return this.episodeService.create(createEpisodeDto);
  }

  @ApiOperation({ summary: episodeApiData.getAllEpisodes })
  @ApiOkResponse({ type: [Episode] })
  @Public()
  @Get()
  findAll() {
    return this.episodeService.findAll();
  }

  @ApiOperation({ summary: episodeApiData.getEpisodeById })
  @ApiOkResponse({ type: EpisodeOkResponce })
  @ApiNotFoundResponse({ type: EpisodeNotFoundResponce })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiParam({ name: 'id', type: 'uuid', example: apiData.idExample })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodeService.findOneById(id);
  }

  @ApiOperation({ summary: episodeApiData.updateEpisodeById })
  @ApiOkResponse({ type: EpisodeOkResponce })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: EpisodeNotFoundResponce })
  @Patch(':id')
  @Roles(Role.admin)
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(id, updateEpisodeDto);
  }

  @ApiOperation({ summary: episodeApiData.deleteEpisodeById })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: EpisodeNotFoundResponce })
  @ApiOkResponse({ type: SuccessResponce })
  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id') id: string) {
    return this.episodeService.remove(id);
  }
}
