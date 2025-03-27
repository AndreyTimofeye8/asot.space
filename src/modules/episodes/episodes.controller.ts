import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
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
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '../../common/enum/role.enum';
import {
  EpisodeNotFoundResponse,
  EpisodeOkResponse,
  EpisodesResponse,
} from './dto/episode.responses';
import { SuccessResponce } from '../../common/responces';
import { CreateEpisodeTrackDto } from './dto/create-episode-track.dto';
import { ResourcePaginationDto } from '../../common/dto/resource-pagination.dto';

@ApiTags(episodeApiData.episodesTag)
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodeService: EpisodesService) {}

  @ApiOperation({ summary: episodeApiData.createEpisode })
  @ApiCreatedResponse({ type: Episode, isArray: true })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiBody({ type: [CreateEpisodeDto] })
  //@ApiTags('Admin')
  @Post()
  @Roles(Role.admin)
  create(
    @Body()
    createEpisodeDto: CreateEpisodeDto[],
  ) {
    return this.episodeService.create(createEpisodeDto);
  }

  @ApiOperation({ summary: episodeApiData.createEpisodeTrackRelation })
  @ApiCreatedResponse({})
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiBody({ type: CreateEpisodeTrackDto })
  //@ApiTags('Admin')
  @Post('episode-track')
  @Roles(Role.admin)
  createEpisodeTrack(
    @Body()
    dto: CreateEpisodeTrackDto,
  ) {
    return this.episodeService.createEpisodeTrackRelation(dto);
  }

  @ApiOperation({ summary: episodeApiData.getAllEpisodes })
  @ApiOkResponse({ type: EpisodesResponse })
  @ApiTags(episodeApiData.episodesTag)
  @Public()
  @Get()
  findAll(@Query() query: ResourcePaginationDto, @Query('year') year?: number) {
    return this.episodeService.findAll(query, year);
  }

  @ApiOperation({ summary: episodeApiData.getEpisodeByNumber })
  @ApiOkResponse({ type: EpisodeOkResponse })
  @ApiNotFoundResponse({ type: EpisodeNotFoundResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  // @ApiParam({
  //   name: 'number',
  //   type: 'string',
  //   example: episodeApiData.episodeNumber,
  // })
  @Public()
  @Get('episode-:number')
  findOne(@Param('number') numberId: string) {
    return this.episodeService.findOneById(numberId);
  }

  @ApiOperation({ summary: episodeApiData.updateEpisodeById })
  @ApiOkResponse({ type: EpisodeOkResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: EpisodeNotFoundResponse })
  //@ApiTags('Admin')
  @Patch(':id')
  @Roles(Role.admin)
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(id, updateEpisodeDto);
  }

  @ApiOperation({ summary: episodeApiData.deleteEpisodeById })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: EpisodeNotFoundResponse })
  @ApiOkResponse({ type: SuccessResponce })
  //@ApiTags('Admin')
  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id') id: string) {
    return this.episodeService.remove(id);
  }
}
