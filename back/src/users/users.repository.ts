import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (user) {
      throw new BadRequestException('Utente essistente');
    }
    const hashPsw = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashPsw,
    });
    await this.userRepository.save(newUser);
    return { message: 'Utente creato con essito', newUser };
  }
}
