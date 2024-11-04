import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestructuringTracks1730750917052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "episode_id"`);

    await queryRunner.query(`
      CREATE TABLE "tracks_episodes" (
        "track_id" uuid NOT NULL,
        "episode_id" uuid NOT NULL,
        PRIMARY KEY ("track_id", "episode_id"),
        CONSTRAINT "FK_track" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_episode" FOREIGN KEY ("episode_id") REFERENCES "episode"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tracks_episodes"`);

    await queryRunner.query(`ALTER TABLE "track" ADD COLUMN "episode_id" uuid`);
  }
}
