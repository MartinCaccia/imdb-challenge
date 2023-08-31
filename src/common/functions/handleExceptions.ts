import { BadRequestException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";


export const handleExceptions =(error: any): never =>{
  // console.log('handleExceptions: ', error);
    const logger = new Logger('MoviesService');
    if (error.status === 404 )
      throw new NotFoundException(error.response.message);
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    
    logger.error(error);
    throw new InternalServerErrorException(`Unexpected error: ${error.message}`);
}