import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { CreateDateColumn } from 'typeorm';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @CreateDateColumn()
    @Exclude()
    updatedAt: Date;
}
