import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Actor } from '../common/entities/actor.entity';
import { Director } from '../common/entities/director.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    TypeOrmModule.forFeature([Movie, Actor, Director]),
    AuthModule
  ],
  exports: [MoviesService, TypeOrmModule],
})
export class MoviesModule {}
