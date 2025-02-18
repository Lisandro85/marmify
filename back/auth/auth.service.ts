import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRespository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRespository.getUserByemail(email);

    if (!user) {
      throw new UnauthorizedException('Bad credentials');
    }

    const validPsw = await bcrypt.compare(password, user.password);

    if (!validPsw) {
      throw new UnauthorizedException('Bad credentials');
    }
    const payload = { email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return { message: `Utente ${user.name} login with susses`, access_token };
  }
}
