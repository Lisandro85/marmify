import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from 'config/typeormconfig';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthModule } from 'auth/auth.module';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeormconfig), UsersModule, AuthModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class AppModule {}
