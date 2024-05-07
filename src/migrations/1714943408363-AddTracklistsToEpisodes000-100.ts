import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTracklistsToEpisodes0001001714943408363
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const episodes = await queryRunner.query(
      `SELECT id FROM episode ORDER BY EPISODE ASC LIMIT 3`,
    );

    const tracks = [
      `(1, 'Warrior', 'Voodoo (Oliver Lieb mix)', 'Incentive promo', '${episodes[1].id}')`,
      `(2, 'Munity', 'Secrets (Ian Wilkie mix)', '', '${episodes[1].id}')`,
      `(3, 'Joker Jam', 'Innocense (Planisphere mix)', '', '${episodes[1].id}')`,
      `(4, 'Liquidation', 'Theme from Liquid (Marco V. mix)', 'Acetate', '${episodes[1].id}')`,
      `(5, 'Sonic Inc.', 'Taste of Summer', 'Bonzai Promo', '${episodes[1].id}')`,
      `(6, 'Natural Born Grooves', 'Kickback (TDR remix)', 'Spinnin'' promo', '${episodes[1].id}')`,
      `(7, 'RR Workshop', '50K (promo)', '', '${episodes[1].id}')`,
      `(8, 'Ultimate Seduction', 'Ultimate Seduction', '', '${episodes[1].id}')`,
      `(9, 'System F. feat. Armin van Buuren', 'Exhale (new mix)', 'Acetate', '${episodes[1].id}')`,
      `(10, 'Blank & Jones', 'Tribal Attack', '', '${episodes[1].id}')`,
      `(11, 'Drax & Scott Mac', 'Sublime (Darkstar remix)', 'Spot on', '${episodes[1].id}')`,
      `(12, 'Orion', 'See me Here', 'Incentive', '${episodes[1].id}')`,
      `(13, 'Praha presents Kian', 'Pachinko Part two', 'Platipus', '${episodes[1].id}')`,
      `(14, '???', 'Clear Blue Moon', 'Acetate', '${episodes[1].id}')`,
      `(15, 'Ralphie B.', 'Massive', 'Blackhole promo', '${episodes[1].id}')`,
      `(16, '???', 'Members of Mayday (Paul van Dijk mix)', 'Promo', '${episodes[1].id}')`,
      `(17, 'Rank1', 'Such is Life', 'Free for All-promo', '${episodes[1].id}')`,
      `(18, 'S.O.L.I.S.', 'Dolphins (Classified Project remix)', 'Alien Promo', '${episodes[1].id}')`,
      `(19, 'Armin van Buuren', 'Blue Fear', 'Cyber Records', '${episodes[1].id}')`,
      `(1, '', '', '', '${episodes[2].id}')`,
      `(2, '', '', '', '${episodes[2].id}')`,
      `(3, '', '', '', '${episodes[2].id}')`,
      `(4, '', '', '', '${episodes[2].id}')`,
      `(5, '', '', '', '${episodes[2].id}')`,
      `(6, '', '', '', '${episodes[2].id}')`,
      `(7, '', '', '', '${episodes[2].id}')`,
      `(8, '', '', '', '${episodes[2].id}')`,
      `(9, '', '', '', '${episodes[2].id}')`,
      `(10, '', '', '', '${episodes[2].id}')`,
      `(11, '', '', '', '${episodes[2].id}')`,
      `(12, '', '', '', '${episodes[2].id}')`,
      `(13, '', '', '', '${episodes[2].id}')`,
      `(14, '', '', '', '${episodes[2].id}')`,
      `(15, '', '', '', '${episodes[2].id}')`,
      `(16, '', '', '', '${episodes[2].id}')`,
      `(17, '', '', '', '${episodes[2].id}')`,
      `(18, '', '', '', '${episodes[2].id}')`,
    ];

    await queryRunner.query(
      `INSERT INTO track (number, artist, title, label, episodeId) VALUES ${tracks.join(', ')}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM track`);
  }
}
