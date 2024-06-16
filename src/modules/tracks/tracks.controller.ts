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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { trackApiData } from './track.constants';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { Track } from 'src/entities/track.entity';
import { Public } from 'src/common/decorator/public.decorator';
import { TrackResponce } from './track.responces';
import {
  ForbiddenResponse,
  UnauthorizedResponse,
} from '../auth/dto/auth.responces';

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

  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiOkResponse({ type: [TrackResponce] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(+id);
  }

  @ApiOperation({ summary: trackApiData.getAllEpisodeTracks })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @Get(':episodeId')
  findAllEpisodeTracks(@Param('id') id: string) {
    return this.tracksService.findOne(+id);
  }

  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Patch(':id')
  @Roles(Role.admin)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(+id, updateTrackDto);
  }

  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id') id: string) {
    return this.tracksService.remove(+id);
  }
}
