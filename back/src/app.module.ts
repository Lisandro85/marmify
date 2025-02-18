import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from 'config/typeormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeormconfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
