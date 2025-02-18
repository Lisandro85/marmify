import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { Role } from 'src/role/role';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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
  deletUser(id: User['id']) {
    return this.userRepository.deletUser(id);
  }
  upateUser(id: User['id'], user: UpdateUserDto) {
    return this.userRepository.upateUser(id, user);
  }
}
