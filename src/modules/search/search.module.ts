import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../../entities/track.entity';
import { Episode } from '../../entities/episode.entity';
import { SearchController } from './search.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, Episode]),
    ElasticsearchModule.register({ node: process.env.ELASTICSEARCH_NODE }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
  // exports: [SearchService],
})
export class SearchModule {}
