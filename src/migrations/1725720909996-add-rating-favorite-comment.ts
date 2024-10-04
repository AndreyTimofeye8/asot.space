import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRatingFavoriteComment1725720909996
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "rating"(
        id SERIAL PRIMARY KEY,
        value SMALLINT NOT NULL CHECK (value >= 1 AND value <= 5),
        episode_id UUID,
        user_id UUID,
        CONSTRAINT "FK_episode" FOREIGN KEY ("episode_id") REFERENCES "episode"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
        )`);

    await queryRunner.query(`CREATE TABLE "comment" (
        id SERIAL PRIMARY KEY,
        content VARCHAR (500) NOT NULL,
        episode_id UUID,
        user_id UUID,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_episode" FOREIGN KEY ("episode_id") REFERENCES "episode"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
        )`);

    await queryRunner.query(`CREATE TABLE "user_episode" (
        user_id UUID NOT NULL,
        episode_id UUID NOT NULL,
        CONSTRAINT "PK_user_episode" PRIMARY KEY ("user_id", "episode_id"),
        CONSTRAINT "FK_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_episode" FOREIGN KEY ("episode_id") REFERENCES "episode"("id") ON DELETE CASCADE
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rating');
    await queryRunner.dropTable('comment');
    await queryRunner.query(`DROP TABLE "user_episode"`);
  }
}
