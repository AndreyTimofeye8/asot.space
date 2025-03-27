import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '../common/decorator/public.decorator';
import { episodeApiData } from '../modules/episodes/episode.constants';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { Episode } from '../entities/episode.entity';
import { EpisodeNotFoundResponse } from '../modules/episodes/dto/episode.responses';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: episodeApiData.findEpisodeByNumber })
  @ApiQuery({
    name: 'episode',
    type: 'string',
    description: episodeApiData.episodeNumberForSearch,
    example: episodeApiData.episodeExample,
  })
  @ApiOkResponse({ type: Episode })
  @ApiNotFoundResponse({ type: EpisodeNotFoundResponse })
  @Public()
  @Get('/searching')
  searchEpisodeByNumber(@Query('episode') episode: string) {
    return this.appService.findEpisodeByNumber(episode);
  }
}
