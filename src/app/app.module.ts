import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TracksModule } from '../modules/tracks/tracks.module';
import { EpisodesModule } from '../modules/episodes/episodes.module';
import { UsersModule } from '../modules/users/users.module';
// import { globalGuard } from 'src/common/guard/global.guard';
import { AuthService } from '../modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../datasource';
import { UsersService } from '../modules/users/users.service';
import { User } from '../entities/user.entity';
import { globalGuardProviders } from '../common/guard/global.guard.providers';
import { Episode } from '../entities/episode.entity';
import { SearchModule } from '../modules/search/search.module';
import { BotModule } from '../modules/bot/bot.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { LabelsModule } from '../modules/labels/labels.module';
import { ArtistsModule } from '../modules/artists/artists.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), 'public', 'static'),
      serveRoot: '/static',
    }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([User, Episode]),
    TracksModule,
    EpisodesModule,
    UsersModule,
    AuthModule,
    SearchModule,
    BotModule,
    LabelsModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [
    ...globalGuardProviders,
    AppService,
    AuthService,
    JwtService,
    UsersService,
  ],
})
export class AppModule {}
