import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../../entities/track.entity';
import { Episode } from '../../entities/episode.entity';
import { SearchController } from './search.controller';
import { Label } from '../../entities/label.entity';
import { Artist } from '../../entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, Episode, Label, Artist]),
    ElasticsearchModule.register({
      node:
        process.env.LOCAL === 'true'
          ? process.env.ELASTICSEARCH_NODE_LOCAL
          : process.env.ELASTICSEARCH_NODE,
    }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
