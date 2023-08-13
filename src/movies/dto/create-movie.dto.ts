import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateMovieDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @Transform((param) => param.value.toLocaleLowerCase())
    title: string;

    @ApiProperty()
    @IsNumber({},{each: true})
    @IsArray()
    @IsNotEmpty()
    genre: number[];

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()    
    director: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()    
    year: number;

    @ApiProperty()
    @IsNumber({},{each: true})
    @IsArray()
    @IsNotEmpty()
    actors: number[];

    @ApiProperty({required:false})
    @IsString()
    description?: string;

    @ApiProperty()
    @CreateDateColumn()
    @Exclude()
    createdAt: Date;
}
