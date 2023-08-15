import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class FilterMovieDto extends PartialType(PaginationDto)  {

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({required:false})
    @IsOptional()
    @IsNumber()
    @IsPositive() 
    @Type(()=>Number)  
    director?: number;

    @ApiProperty({required:false})
    @IsOptional()
    @IsNumber()
    @IsPositive() 
    @Type(()=>Number)  
    year?: number;
}
