import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../../entities/track.entity';
import { Artist } from '../../entities/artist.entity';
import { Award } from '../../entities/award.entity';
import { TrackEpisode } from 'src/entities/track-episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist, Award, TrackEpisode])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
