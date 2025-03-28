import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEpisodesAndDates1012001714584516422
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const episodeDates = [
      '2003-06-12',
      '2003-06-19',
      '2003-06-26',
      '2003-07-04',
      '2003-07-10',
      '2003-07-17',
      '2003-07-24',
      '2003-07-31',
      '2003-08-07',
      '2003-08-14',
      '2003-08-21',
      '2003-08-28',
      '2003-09-04',
      '2003-09-11',
      '2003-09-18',
      '2003-09-25',
      '2003-10-02',
      '2003-10-09',
      '2003-10-16',
      '2003-10-23',
      '2003-10-30',
      '2003-11-06',
      '2003-11-13',
      '2003-11-20',
      '2003-11-27',
      '2003-12-04',
      '2003-12-11',
      '2003-12-18',
      '2003-12-25',
      '2004-01-08',
      '2004-01-15',
      '2004-01-22',
      '2004-01-29',
      '2004-02-05',
      '2004-02-12',
      '2004-02-19',
      '2004-02-26',
      '2004-03-04',
      '2004-03-11',
      '2004-03-18',
      '2004-03-25',
      '2004-04-01',
      '2004-04-08',
      '2004-04-15',
      '2004-04-22',
      '2004-04-29',
      '2004-05-06',
      '2004-05-13',
      '2004-05-20',
      '2004-05-27',
      '2004-06-03',
      '2004-06-10',
      '2004-06-17',
      '2004-06-24',
      '2004-07-01',
      '2004-07-08',
      '2004-07-15',
      '2004-07-22',
      '2004-07-29',
      '2004-08-05',
      '2004-08-12',
      '2004-08-19',
      '2004-08-26',
      '2004-09-02',
      '2004-09-09',
      '2004-09-16',
      '2004-09-23',
      '2004-09-30',
      '2004-10-07',
      '2004-10-14',
      '2004-10-21',
      '2004-10-28',
      '2004-11-04',
      '2004-11-11',
      '2004-11-18',
      '2004-11-25',
      '2004-12-02',
      '2004-12-09',
      '2004-12-16',
      '2004-12-23',
      '2004-12-30',
      '2005-01-06',
      '2005-02-10',
      '2005-02-17',
      '2005-02-24',
      '2005-03-03',
      '2005-03-10',
      '2005-03-17',
      '2005-03-24',
      '2005-03-31',
      '2005-04-07',
      '2005-04-14',
      '2005-04-21',
      '2005-04-28',
      '2005-05-05',
      '2005-05-12',
      '2005-05-19',
      '2005-05-26',
      '2005-06-02',
      '2005-06-09',
    ];

    if (episodeDates.length < 100) {
      throw new Error('not enough episodes');
    }

    for (let i = 0; i < 100; i++) {
      const episode = (i + 101).toString().padStart(3, '0');
      const episodeDate = episodeDates[i];

      await queryRunner.query(
        `INSERT INTO episode (episode, date) VALUES ($1, $2)`,
        [episode, episodeDate],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM episode`);
  }
}
