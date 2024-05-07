import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1714584391855 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`CREATE TABLE episode (
        id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        episode VARCHAR NOT NULL,
        date DATE NOT NULL,
        youtube VARCHAR(500) NULL)`);

    await queryRunner.query(`CREATE TABLE track (
        id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        number SMALLINT NOT NULL,
        artist VARCHAR(100) NOT NULL,
        title VARCHAR(300) NOT NULL,
        label VARCHAR(100) NULL,
        episodeId UUID NOT NULL,
        CONSTRAINT fk_episode_track FOREIGN KEY (episodeId) REFERENCES episode(id))`);

    await queryRunner.query(`CREATE TABLE audio_file (
        id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        link VARCHAR(1000) NULL,
        description VARCHAR(100) NULL,
        episodeId UUID NOT NULL,
        CONSTRAINT fk_episode_audioFile FOREIGN KEY (episodeId) REFERENCES episode(id))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE episode`);
    await queryRunner.query(`DROP TABLE track`);
    await queryRunner.query(`DROP TABLE audio_file`);
  }
}
