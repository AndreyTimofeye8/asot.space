import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovingTrackNumber1735206098817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "number"`);
    await queryRunner.query(
      `ALTER TABLE "track_episode" ADD COLUMN "number" SMALLINT NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "track_episode" DROP COLUMN "number"`);
    await queryRunner.query(
      `ALTER TABLE "track" ADD COLUMN "number" SMALLINT NOT NULL`,
    );
  }
}
