import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestructuringTracks1730750917052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "artist" (
          "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
          "name" VARCHAR(100) NOT NULL
      );
    `);

    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "episode_id";`);

    await queryRunner.query(`
      CREATE TABLE "tracks_episodes" (
        "track_id" uuid NOT NULL,
        "episode_id" uuid NOT NULL,
        PRIMARY KEY ("track_id", "episode_id"),
        CONSTRAINT "FK_track" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_episode" FOREIGN KEY ("episode_id") REFERENCES "episode"("id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "track_artists" (
          "track_id" uuid NOT NULL,
          "artist_id" uuid NOT NULL,
        CONSTRAINT "FK_track" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_artist" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "artist";`);

    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "label";`);

    await queryRunner.query(`ALTER TABLE "track" ADD COLUMN "label_id" uuid;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artist";`);

    await queryRunner.query(
      `ALTER TABLE "track" ADD COLUMN "episode_id" uuid;`,
    );

    await queryRunner.query(
      `ALTER TABLE "track_artists" DROP CONSTRAINT "FK_track";`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_artists" DROP CONSTRAINT "FK_artist";`,
    );

    await queryRunner.query(`DROP TABLE "tracks_episodes";`);

    await queryRunner.query(`DROP TABLE "track_artists";`);

    await queryRunner.query(
      `ALTER TABLE "track" ADD COLUMN "artist" VARCHAR(100);`,
    );

    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "label_id";`);

    await queryRunner.query(
      `ALTER TABLE "track" ADD COLUMN "label" VARCHAR(100);`,
    );
  }
}
