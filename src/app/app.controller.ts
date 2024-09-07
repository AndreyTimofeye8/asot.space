import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/common/decorator/public.decorator';
import { episodeApiData } from 'src/modules/episodes/episode.constants';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { Episode } from 'src/entities/episode.entity';
import { EpisodeNotFoundResponce } from 'src/modules/episodes/dto/episode.responces';

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
  @ApiNotFoundResponse({ type: EpisodeNotFoundResponce })
  @Public()
  @Get('/searching')
  searchEpisodeByNumber(@Query('episode') episode: string) {
    return this.appService.findEpisodeByNumber(episode);
  }
}
