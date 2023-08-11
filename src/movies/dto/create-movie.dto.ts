import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateMovieDto {

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    title: string;

    @IsNumber({},{each: true})
    @IsArray()
    @IsNotEmpty()
    genre: number[];

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()    
    director: number;

    @IsNumber({},{each: true})
    @IsArray()
    @IsNotEmpty()
    actors: number[];

    @IsString()
    description?: string;
}
