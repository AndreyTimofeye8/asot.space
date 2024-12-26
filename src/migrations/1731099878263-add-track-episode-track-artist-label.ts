import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTrackEpisodeTrackArtistAndLabel1731099878263
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "label" (
          id SERIAL PRIMARY KEY NOT NULL,
          "name" VARCHAR(100) NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "track_episode" (
        "track_id" uuid NOT NULL,
        "episode_id" uuid NOT NULL,
        CONSTRAINT "PK_track_episode" PRIMARY KEY ("track_id", "episode_id"),
        CONSTRAINT "FK_track" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_episode" FOREIGN KEY ("episode_id") REFERENCES "episode"("id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "track_artist" (
        "track_id" uuid NOT NULL,
        "artist_id" integer NOT NULL,
        CONSTRAINT "PK_track_artist" PRIMARY KEY ("track_id", "artist_id"),
        CONSTRAINT "FK_track" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_artist" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "track_episode"`);

    await queryRunner.query(`DROP TABLE "track_artist"`);

    await queryRunner.query(`DROP TABLE "label"`);
  }
}
