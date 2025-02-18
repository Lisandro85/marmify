import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { Role } from 'src/role/role';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }
  getUser() {
    return this.userRepository.getUser();
  }
  getByRole(role: Role) {
    return this.userRepository.getByRole(role);
  }
}
