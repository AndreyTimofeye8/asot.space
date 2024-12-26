import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './services/bot.service';
import { BotLaunchService } from './services/bot-launch.service';
import { session } from 'telegraf';
import { BotSearchService } from './services/bot-search.service';
import { EpisodesModule } from '../episodes/episodes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TG_TOKEN,
      middlewares: [session()],
    }),
    ConfigModule.forRoot(),
    EpisodesModule,
  ],
  providers: [BotService, BotLaunchService, BotSearchService],
})
export class BotModule {}
