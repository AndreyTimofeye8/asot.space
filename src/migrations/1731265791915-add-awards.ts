import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAwards1731265791915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE award (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30) NOT NULL,
          description TEXT
        );
      `);

    await queryRunner.query(`INSERT INTO award (name, description) 
        VALUES
        ('TUNE OF THE YEAR', null),
        ('TUNE OF THE WEEK', null),
        ('PROGRESSIVE PICK', null),
        ('TRENDING TRACK', null),
        ('FUTURE FAVORITE', null),
        ('SERVICE FOR DREAMERS', null),
        ('ASOT Radio Classic', null)
        `);

    await queryRunner.query(`
        ALTER TABLE track_episode
        ADD COLUMN award_id INTEGER,
        ADD CONSTRAINT fk_award
        FOREIGN KEY (award_id) REFERENCES award(id)
        ON DELETE SET NULL;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE track_episode
        DROP CONSTRAINT fk_award,
        DROP COLUMN award_id;
      `);

    await queryRunner.query(`DROP TABLE "award"`);
  }
}
