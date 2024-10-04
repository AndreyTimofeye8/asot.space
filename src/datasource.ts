import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
config();

const {
  DB_HOST,
  DB_HOST_LOCAL,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  LOCAL,
} = process.env;

const isLocal = LOCAL === 'true';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: isLocal ? DB_HOST_LOCAL : DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
});
