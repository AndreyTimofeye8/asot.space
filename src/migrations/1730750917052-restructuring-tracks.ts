import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestructuringTracks1730750917052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "artist" (
          id SERIAL PRIMARY KEY NOT NULL,
          "name" VARCHAR(100) NOT NULL
      );
    `);

    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "artist";`);

    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "label";`);

    await queryRunner.query(
      `ALTER TABLE "track" ADD COLUMN "label_id" integer;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artist"`);

    await queryRunner.query(
      `ALTER TABLE "track" ADD COLUMN "artist" VARCHAR (100);`,
    );

    await queryRunner.query(
      `ALTER TABLE "track" ADD COLUMN "label" VARCHAR (100);`,
    );

    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "label_id";`);
  }
}
