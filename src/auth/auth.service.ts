import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { handleExceptions } from '../common/functions/handleExceptions';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateAuthDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtservice: JwtService
  ){ }

  async createUser(createAuthDto: CreateUserDto) {
    // return 'This action adds a new auth';
    try {
      const { password, ...userData } = createAuthDto;

      const user = await this.userRepository.save({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      delete user.password;

      return {
        ...user,
        token: this.getJwt({id: user.id})
      }
    } catch (error) {
      handleExceptions(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const [user] = await this.userRepository.find(
     { 
      select: {email: true, password: true, id: true, isActive: true},
      where: { email: email}
     }
    );
    if(!user)
      throw new UnauthorizedException('Credentials are not valid');
    if(!user.isActive)
      throw new UnauthorizedException('User inactive');  
    
    if( !bcrypt.compareSync(password, user.password) )
      throw new UnauthorizedException('Credentials are not valid');

    return {
      login: true, 
      user: user.email,
      token: this.getJwt({id: user.id})
    };
  }

  private getJwt(jwtPayload: JwtPayload){
    const token = this.jwtservice.sign(jwtPayload);
    return token;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
