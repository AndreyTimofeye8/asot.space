import { Module } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from '../../entities/episode.entity';
import { Track } from 'src/entities/track.entity';
import { TrackEpisode } from 'src/entities/track-episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Track, TrackEpisode])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
  exports: [EpisodesService],
})
export class EpisodesModule {}
