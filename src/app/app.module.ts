import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TracksModule } from 'src/modules/tracks/tracks.module';
import { EpisodesModule } from 'src/modules/episodes/episodes.module';
import { UsersModule } from 'src/modules/users/users.module';
// import { globalGuard } from 'src/common/guard/global.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'src/datasource';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/entities/user.entity';
import { globalGuardProviders } from 'src/common/guard/global.guard.providers';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([User]),
    TracksModule,
    EpisodesModule,
    UsersModule,
    AuthModule,
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
