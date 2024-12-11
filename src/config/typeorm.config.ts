import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'library.db',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: true, // Set to false in production
};
