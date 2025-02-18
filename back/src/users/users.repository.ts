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

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; userNopsw: Partial<User> }> {
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
    const { password, ...userNopsw } = newUser;
    return { message: 'Utente creato con essito', userNopsw };
  }

  async getUser(): Promise<{ message: string; users: User[] }> {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'lastname', 'isActive', 'role'],
    });
    if (!users) {
      throw new BadRequestException('Non esistono Utenti');
    }
    return { message: 'Lista di Utenti:', users };
  }
}
