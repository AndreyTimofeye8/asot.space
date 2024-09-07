import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get()
  async search(@Query('q') query: string) {
    return this.searchService.searchAll(query);
  }
}
