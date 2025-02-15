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
import { Role } from '../../common/enum/role.enum';
import { Track } from '../../entities/track.entity';
import { TrackNotFoundResponce, TrackResponce } from './track.responces';
import {
  ForbiddenResponse,
  UnauthorizedResponse,
} from '../auth/dto/auth.responces';
import { SuccessResponce } from '../../common/responces';
import { apiData } from '../../common/constants';
import { CreateTrackArtistDto } from './dto/create-track-artist.dto';
import { CreateAwardDto } from './dto/create-award.dto';
import { ResourcePaginationDto } from 'src/common/dto/resource-pagination.dto';

@ApiTags(trackApiData.tracksTag)
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOperation({ summary: trackApiData.createTrack })
  @ApiBody({ type: [CreateTrackDto] })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: apiData.unauthorizedOperation,
  })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiCreatedResponse({
    type: [Track],
    description: apiData.successfulOperation,
  })
  //@ApiTags('Admin')
  @Post()
  @Roles(Role.admin)
  create(@Body() createTrackDto: CreateTrackDto[]) {
    return this.tracksService.create(createTrackDto);
  }

  @ApiOperation({ summary: trackApiData.createTrackArtistRelation })
  @ApiBody({ type: CreateTrackArtistDto })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: apiData.unauthorizedOperation,
  })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiCreatedResponse({
    type: [Track],
    description: apiData.successfulOperation,
  })
  //@ApiTags('Admin')
  @Post('track-artist')
  @Roles(Role.admin)
  createTrackArtist(@Body() dto: CreateTrackArtistDto) {
    return this.tracksService.createTrackArtistRelation(dto);
  }

  @ApiOperation({ summary: trackApiData.createTrackAward })
  @ApiBody({ type: CreateTrackArtistDto })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: apiData.unauthorizedOperation,
  })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiCreatedResponse({
    type: [Track],
    description: apiData.successfulOperation,
  })
  //@ApiTags('Admin')
  @Post('award')
  @Roles(Role.admin)
  addTrackAwardAndNumber(@Body() dto: CreateAwardDto) {
    return this.tracksService.createTrackNumberAndAward(dto);
  }

  @ApiOperation({ summary: trackApiData.getAllTracks })
  @ApiOkResponse({ type: [TrackResponce] })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: apiData.unauthorizedOperation,
  })
  @Roles(Role.admin)
  @Get()
  findAll(@Query() query: ResourcePaginationDto) {
    return this.tracksService.findAll(query);
  }

  @ApiOperation({ summary: trackApiData.updateTrackById })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: TrackNotFoundResponce })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiOkResponse({
    type: TrackResponce,
    description: apiData.successfulOperation,
  })
  //@ApiTags('Admin')
  @Patch(':id')
  @Roles(Role.admin)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @ApiOperation({ summary: trackApiData.deleteTrackById })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiNotFoundResponse({ type: TrackNotFoundResponce })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiOkResponse({
    type: SuccessResponce,
    description: apiData.successfulOperation,
  })
  //@ApiTags('Admin')
  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id') id: string) {
    return this.tracksService.remove(id);
  }
}
