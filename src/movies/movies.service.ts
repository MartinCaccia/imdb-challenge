import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterMovieDto } from './dto/filter-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {

  private readonly logger = new Logger('MoviesService');

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ){ }

  async create(createMovieDto: CreateMovieDto) {
    // return 'This action adds a new movie';
    try {
      const movie = this.movieRepository.create(createMovieDto);
      await this.movieRepository.save(movie);
      return movie;
    } catch (error) {
        this.handleExceptions(error);
    }
  }

  async findAll(filterMovieDto: FilterMovieDto) {
    // return `This action returns all movies`;
    try {
      const { limit =10, offset = 0, director, title, genre, actors} = filterMovieDto;

      const queryBuilder = this.movieRepository.createQueryBuilder();
      const queryResult = await queryBuilder.where(
        'director =:director or title =:title or genre =:genre or actors =:actors',
        {director: director, title: title, genre: genre, actors: actors}
      )
      .offset(offset).limit(limit)
      .orderBy('title', 'ASC')
      .getMany();

      return queryResult;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: number) {
    // return `This action returns a #${id} movie`;
    try {
      const movie = await this.movieRepository.findOneBy({id});
      if (!movie)
        throw new NotFoundException(`The movie ${id} does not exist`);        
      return movie;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: number) {
    // return `This action removes a #${id} movie`;
    return await this.movieRepository.delete(id);
  }

  private handleExceptions(error: any){
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Unexpected error: ${error.message}`);
  }
}
