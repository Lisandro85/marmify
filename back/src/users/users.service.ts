import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }
}
