import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [EpisodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
