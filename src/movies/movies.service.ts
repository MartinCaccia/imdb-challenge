import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterMovieDto } from './dto/filter-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Actor } from 'src/common/entities/actor.entity';
import { Director } from 'src/common/entities/director.entity';

@Injectable()
export class MoviesService {

  private readonly logger = new Logger('MoviesService');

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ){ }

  async create(createMovieDto: CreateMovieDto) {
    // return 'This action adds a new movie';
    try {
      // console.log('createMovieDto: ', createMovieDto);
      const actors = await this.actorRepository.findBy({ id: In(createMovieDto.actors) });
      const director = await this.directorRepository.findBy({ id: createMovieDto.director });
      // console.log('actors: ', actors);
      // console.log('director: ', director);
      const movie = new Movie();
      movie.actors = actors;
      movie.director = director[0];
      movie.description = createMovieDto.description;
      movie.genre = createMovieDto.genre;
      movie.title = createMovieDto.title;
      movie.year = createMovieDto.year;

      return await this.movieRepository.save(movie);
    } catch (error) {
        this.handleExceptions(error);
    }
  }

  async findAll(filterMovieDto: FilterMovieDto) {
    // return `This action returns all movies`;
    try {
      const { limit =10, offset = 0, director, title, genre, actors, year} = filterMovieDto;

      const queryBuilder = this.movieRepository.createQueryBuilder();
      const queryResult = await queryBuilder
      .select(["Movie.title", "Movie.year"])
      .where(
        'title LIKE :title',
        {
          title: `%${title?.toLocaleLowerCase()}%`,
        }
      )
      .orWhere('director =:director', {director: director})
      // .orWhere('genre IN (:...genre)', {genre: genre})
      // .orWhere('actors IN (:...actors)', {actors: actors})
      .orWhere('year =:year', {year: year})
      .offset(offset).limit(limit)
      .orderBy('title', 'ASC')
      // .printSql()
      // .getMany();
      // .getQueryAndParameters()
      .getRawMany();

      return queryResult;
    } catch (error) {
      console.log(error);
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

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    // return `This action updates a #${id} movie`;
    try {
      // const movie = await this.movieRepository.preload({
      //   id: id,
      //   ...updateMovieDto
      // });
      // if(!movie) throw new NotFoundException(`Movie with id ${id} not found`);
      // return await this.movieRepository.save(movie);
    } catch (error) {
      this.handleExceptions(error);
    }
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
