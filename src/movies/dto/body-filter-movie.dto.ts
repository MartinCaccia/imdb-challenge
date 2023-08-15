import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional } from "class-validator";

export class BodyFilterMovieDto {

    @ApiProperty({required:false})
    @IsOptional()
    @IsNumber({},{each: true})
    @IsArray()    
    genres?: number[];

    @ApiProperty({required:false})
    @IsOptional()
    @IsNumber({},{each: true})
    @IsArray()
    actors?: number[];
}
