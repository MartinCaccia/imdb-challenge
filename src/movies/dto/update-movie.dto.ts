import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';
import { UpdateDateColumn } from 'typeorm';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @ApiProperty()
    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;
}
