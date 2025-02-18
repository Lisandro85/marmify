import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/users/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_LOCALHOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PSW,
  database: process.env.DB_DBNAME,
  entities: [User],
  synchronize: true,
  dropSchema: false,
};
console.log('Conectado a la DB 🚀');
