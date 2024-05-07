import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEpisodesAndDates3004991714907413499
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const episodeDates = [
      '2007-05-17',
      '2007-05-24',
      '2007-05-31',
      '2007-06-07',
      '2007-06-14',
      '2007-06-21',
      '2007-06-28',
      '2007-07-05',
      '2007-07-12',
      '2007-07-19',
      '2007-07-26',
      '2007-08-02',
      '2007-08-09',
      '2007-08-16',
      '2007-08-23',
      '2007-08-30',
      '2007-09-06',
      '2007-09-13',
      '2007-09-20',
      '2007-09-27',
      '2007-10-04',
      '2007-10-11',
      '2007-10-18',
      '2007-10-25',
      '2007-11-01',
      '2007-11-08',
      '2007-11-15',
      '2007-11-22',
      '2007-11-29',
      '2007-12-06',
      '2007-12-13',
      '2007-12-20',
      '2007-12-27',
      '2008-01-03',
      '2008-01-10',
      '2008-01-17',
      '2008-01-24',
      '2008-01-31',
      '2008-02-07',
      '2008-02-14',
      '2008-02-21',
      '2008-02-28',
      '2008-03-06',
      '2008-03-13',
      '2008-03-20',
      '2008-03-27',
      '2008-04-03',
      '2008-04-10',
      '2008-04-17',
      '2008-04-24',
      '2008-05-01',
      '2008-05-08',
      '2008-05-15',
      '2008-05-22',
      '2008-05-29',
      '2008-06-05',
      '2008-06-12',
      '2008-06-19',
      '2008-06-26',
      '2008-07-03',
      '2008-07-10',
      '2008-07-17',
      '2008-07-24',
      '2008-07-31',
      '2008-08-07',
      '2008-08-14',
      '2008-08-21',
      '2008-08-28',
      '2008-09-04',
      '2008-09-11',
      '2008-09-18',
      '2008-09-25',
      '2008-10-02',
      '2008-10-09',
      '2008-10-16',
      '2008-10-23',
      '2008-10-30',
      '2008-11-06',
      '2008-11-13',
      '2008-11-20',
      '2008-11-27',
      '2008-12-04',
      '2008-12-11',
      '2008-12-18',
      '2008-12-25',
      '2009-01-01',
      '2009-01-08',
      '2009-01-15',
      '2009-01-22',
      '2009-01-29',
      '2009-02-05',
      '2009-02-12',
      '2009-02-19',
      '2009-02-26',
      '2009-03-05',
      '2009-03-12',
      '2009-03-19',
      '2009-03-26',
      '2009-04-02',
      '2009-04-09',
      '2009-04-16',
      '2009-04-23',
      '2009-04-30',
      '2009-05-07',
      '2009-05-14',
      '2009-05-21',
      '2009-05-28',
      '2009-06-04',
      '2009-06-11',
      '2009-06-18',
      '2009-06-25',
      '2009-07-02',
      '2009-07-09',
      '2009-07-16',
      '2009-07-23',
      '2009-07-30',
      '2009-08-06',
      '2009-08-13',
      '2009-08-20',
      '2009-08-27',
      '2009-09-03',
      '2009-09-10',
      '2009-09-17',
      '2009-09-24',
      '2009-10-01',
      '2009-10-08',
      '2009-10-15',
      '2009-10-22',
      '2009-10-29',
      '2009-11-05',
      '2009-11-12',
      '2009-11-19',
      '2009-11-26',
      '2009-12-03',
      '2009-12-10',
      '2009-12-17',
      '2009-12-24',
      '2009-12-31',
      '2010-01-07',
      '2010-01-14',
      '2010-01-21',
      '2010-01-28',
      '2010-02-04',
      '2010-02-11',
      '2010-02-18',
      '2010-02-25',
      '2010-03-04',
      '2010-03-11',
      '2010-03-18',
      '2010-03-25',
      '2010-04-01',
      '2010-04-08',
      '2010-04-15',
      '2010-04-22',
      '2010-04-29',
      '2010-05-06',
      '2010-05-13',
      '2010-05-20',
      '2010-05-27',
      '2010-06-03',
      '2010-06-10',
      '2010-06-17',
      '2010-06-24',
      '2010-07-01',
      '2010-07-08',
      '2010-07-15',
      '2010-07-22',
      '2010-07-29',
      '2010-08-05',
      '2010-08-12',
      '2010-08-19',
      '2010-08-26',
      '2010-09-02',
      '2010-09-09',
      '2010-09-16',
      '2010-09-23',
      '2010-09-30',
      '2010-10-07',
      '2010-10-14',
      '2010-10-21',
      '2010-10-28',
      '2010-11-04',
      '2010-11-11',
      '2010-11-18',
      '2010-11-25',
      '2010-12-02',
      '2010-12-09',
      '2010-12-16',
      '2010-12-23',
      '2010-12-30',
      '2011-01-06',
      '2011-01-13',
      '2011-01-20',
      '2011-01-27',
      '2011-02-03',
      '2011-02-10',
      '2011-02-17',
      '2011-02-23',
      '2011-03-03',
      '2011-03-10',
      '2011-03-17',
    ];

    if (episodeDates.length < 200) {
      throw new Error('not enough episodes');
    }

    for (let i = 0; i < 201; i++) {
      const episode = (i + 300).toString().padStart(3, '0');
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
