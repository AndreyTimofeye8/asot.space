import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnEpisodeIdForTrackAndAudioFile1718136723707
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track" RENAME COLUMN "episodeid" TO "episode_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_file" RENAME COLUMN "episodeid" TO "episode_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track" RENAME COLUMN "episode_id" TO "episodeid"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_file" RENAME COLUMN "episode_id" TO "episodeid"`,
    );
  }
}
