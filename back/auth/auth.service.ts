import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/loginDto';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRespository: UserRepository) {}

  async login(email: string, password: string) {
    const validEmail = await this.userRespository.getUserByemail(email);

    if (!validEmail) {
      throw new UnauthorizedException('Bad credentials');
    }

    const validPsw = await bcrypt.compare(password, validEmail.password);

    if (!validPsw) {
      throw new UnauthorizedException('Bad credentials');
    }

    return { message: `Utente ${validEmail.name} login with susses` };
  }
}
