import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddImageToEpiode1722112351647 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'episode',
      new TableColumn({
        name: 'image_url',
        type: 'varchar',
        length: '1000',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('episode', 'image_url');
  }
}
