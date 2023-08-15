import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterMovieDto } from './dto/filter-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Actor } from '../common/entities/actor.entity';
import { Director } from '../common/entities/director.entity';
import { BodyFilterMovieDto } from './dto/body-filter-movie.dto';

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
      const newMovie = await this.getNewMovie(createMovieDto);
      return await this.movieRepository.save(newMovie);
    } catch (error) {
        this.handleExceptions(error);
    }
  }

  async findAll(filterMovieDto: FilterMovieDto, bodyFilterMovieDto: BodyFilterMovieDto) {
    // return `This action returns all movies`;
    try {
      const { limit =10, offset = 0, director, title, year} = filterMovieDto;
      const { actors, genres } = bodyFilterMovieDto;
      // console.log('actors: ', actors);
      const queryBuilder = this.movieRepository.createQueryBuilder('m');
      const queryResult = await queryBuilder
      .select(["m.id AS id", "m.title AS tittle", "m.year AS year", 
      "d.name AS director_name", "d.lastName AS director_lastname",
      "a.name AS actor_name", "a.lastName AS actor_lastname" ])
      .where(
        'm.title LIKE :title',
        {
          title: `%${title?.toLocaleLowerCase()}%`,
        }
      )
      .orWhere('m.director =:director', {director: director})
      .orWhere('m.year =:year', {year: year})
      .innerJoin(Director, 'd', 'd.id = m.director')
      .innerJoin('movies_actors', 'ma', 'ma.movieId = m.id')
      .innerJoin(Actor, 'a', 'a.id = ma.actorId')
      .orWhere('ma.actorId IN (:...actors)', {actors: actors})
      // .orWhere('m.genre IN (:...genre)', {genre: genres})
      .offset(offset).limit(limit)
      .orderBy('m.title', 'ASC')
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
      const movie = await this.movieRepository.findOneBy({id});
      if(!movie) throw new NotFoundException(`Movie with id ${id} not found`);
      const updateMovie = await this.getNewMovie(updateMovieDto);
      this.movieRepository.merge(movie, updateMovie);
      return this.movieRepository.save(movie);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} movie`;
    return await this.movieRepository.delete(id);
  }

  private async getNewMovie(movie: CreateMovieDto | UpdateMovieDto): Promise<Movie>{
    try {
      const actors = await this.getActors(movie.actors);
      const director = await this.getDirector(movie.director);
      const newMovie = new Movie();
      newMovie.actors = actors;
      newMovie.director = director;
      newMovie.description = movie.description;
      newMovie.genre = movie.genre;
      newMovie.title = movie.title;
      newMovie.year = movie.year;
      return newMovie;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private async getActors(ids: number[]): Promise<Actor[]> {
    try {
      const actors = await this.actorRepository.findBy({ id: In(ids) });
      if(!actors) throw new NotFoundException(`Actors with ids ${ids} not found`);
      return actors;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private async getDirector(id: number): Promise<Director> {
    try {
      const director = await this.directorRepository.findBy({ id });
      if(!director[0]) throw new NotFoundException(`Director with id ${ id } not found`);
      return director[0];
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any){
    // console.log('handleExceptions: ', error);
    if (error.status === 404 )
      throw new NotFoundException(error.response.message);
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    
    this.logger.error(error);
    throw new InternalServerErrorException(`Unexpected error: ${error.message}`);
  }
}
