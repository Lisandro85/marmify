import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/role/role';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'auth/AuthGuard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUser() {
    return this.usersService.getUser();
  }

  @Delete('/:id')
  deletUser(@Param('id') id: User['id']) {
    return this.usersService.deletUser(id);
  }

  @Get('role/:role')
  @UseGuards(AuthGuard)
  getByRole(@Param('role') role: Role) {
    return this.usersService.getByRole(role);
  }

  @Patch('/:id')
  upateUser(@Param('id') id: User['id'], @Body() user: UpdateUserDto) {
    return this.usersService.upateUser(id, user);
  }
}
