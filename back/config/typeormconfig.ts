import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { User } from 'src/users/entities/user.entity';

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
