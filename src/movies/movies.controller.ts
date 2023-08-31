import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FilterMovieDto } from './dto/filter-movie.dto';
import { BodyFilterMovieDto } from './dto/body-filter-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards( AuthGuard() )
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(@Query() filterMovieDto: FilterMovieDto, @Body() bodyFilterMovie: BodyFilterMovieDto) {
    return this.moviesService.findAll(filterMovieDto, bodyFilterMovie);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards( AuthGuard() )
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards( AuthGuard() )
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
