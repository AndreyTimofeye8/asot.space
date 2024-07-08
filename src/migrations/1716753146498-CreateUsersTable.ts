import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1716753146498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`CREATE TYPE role_enum AS ENUM (
        'user',
        'admin'
    )`);

    await queryRunner.query(`CREATE TABLE "user" (
        id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        login VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role role_enum NOT NULL DEFAULT 'user'
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE role_enum`);
  }
}
