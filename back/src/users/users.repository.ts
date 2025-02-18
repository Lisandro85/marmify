import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from 'auth/dto/loginDto';

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

  async getUser(): Promise<{ message: string; users: Partial<User>[] }> {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'lastname', 'isActive', 'role'],
    });
    if (!users) {
      throw new BadRequestException('Non esistono Utenti');
    }
    return { message: 'Lista di Utenti:', users };
  }

  async getByRole(role: Role) {
    const user = await this.userRepository.find({
      where: { role: role },
      select: ['name', 'lastname', 'isActive', 'role'],
    });
    if (!user) {
      throw new BadRequestException(
        `Non essistono Utienti con i roll ${role} `,
      );
    }

    return { message: `Utenti con i role ${role}`, user };
  }

  async deletUser(id: User['id']) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new BadRequestException('Utenti non tovato');
    }
    await this.userRepository.delete(user);
    return { message: `Utente ${user.name} cancellato con essito` };
  }

  async upateUser(
    id: User['id'],
    user: UpdateUserDto,
  ): Promise<{ message: string; userUpdate: Partial<User> }> {
    const userExist = await this.userRepository.findOne({ where: { id: id } });
    if (!userExist) {
      throw new BadRequestException('Utente non trovato');
    }
    await this.userRepository.update(id, user);

    const userUpdate = await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'name', 'lastname', 'email', 'isActive', 'role'],
    });
    if (!userUpdate) {
      throw new BadRequestException(
        "Errore durante l'aggiornamento dell'utente",
      );
    }
    return { message: 'Utente agiornato corretamente', userUpdate };
  }
  async getUserByemail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
