import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Report } from 'src/reports/reports.entity';

export const dbdatasource: DataSourceOptions = {
  // TypeORM PostgreSQL DB Drivers
  type: 'sqlite',

  // Database name
  database: 'db.sqlite',

  // Synchronize database schema with entities
  synchronize: false,
  // process.env.NODE_ENV !== 'production' ? true : false,

  logging: true,
  // TypeORM Entity
  entities: [User, Report],
  migrations: ['migrations/*.js'],
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
