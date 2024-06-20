import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { trackApiData } from './track.constants';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { Track } from 'src/entities/track.entity';
import { TrackNotFoundResponce, TrackResponce } from './track.responces';
import {
  ForbiddenResponse,
  UnauthorizedResponse,
} from '../auth/dto/auth.responces';
import { SuccessResponce } from 'src/common/responces';

@ApiTags(trackApiData.tracksTag)
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOperation({ summary: trackApiData.createTrack })
  @ApiBody({ type: [CreateTrackDto] })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiCreatedResponse({ type: [Track] })
  @Post()
  @Roles(Role.admin)
  create(@Body() createTrackDto: CreateTrackDto[]) {
    return this.tracksService.create(createTrackDto);
  }

  @ApiOperation({ summary: trackApiData.getAllTracks })
  @ApiOkResponse({ type: [TrackResponce] })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @ApiOperation({ summary: trackApiData.getTrackById })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: TrackNotFoundResponce })
  @ApiOkResponse({ type: TrackResponce })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @ApiOperation({ summary: trackApiData.getAllEpisodeTracks })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiOkResponse({ type: [TrackResponce] })
  @Get('/episode/:episodeId')
  findAllEpisodeTracks(@Param('id') id: string) {
    return this.tracksService.findEpisodeTracks(id);
  }

  @ApiOperation({ summary: trackApiData.updateTrackById })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: TrackNotFoundResponce })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiOkResponse({ type: TrackResponce })
  @Patch(':id')
  @Roles(Role.admin)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @ApiOperation({ summary: trackApiData.deleteTrackById })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: TrackNotFoundResponce })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiOkResponse({ type: SuccessResponce })
  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id') id: string) {
    return this.tracksService.remove(id);
  }
}
