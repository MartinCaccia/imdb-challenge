// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';
import { CreateDateColumn } from 'typeorm';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @ApiProperty()
    @CreateDateColumn()
    @Exclude()
    updatedAt: Date;
}
