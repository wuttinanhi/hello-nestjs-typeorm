import { MigrationInterface, QueryRunner } from 'typeorm';

export class v21647621249785 implements MigrationInterface {
  name = 'v21647621249785';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cat\` CHANGE \`v1\` \`v2\` varchar(255) NOT NULL DEFAULT 'DEFAULT'`,
    );
    await queryRunner.query(`ALTER TABLE \`cat\` DROP COLUMN \`v2\``);
    await queryRunner.query(
      `ALTER TABLE \`cat\` ADD \`v2\` varchar(255) NOT NULL DEFAULT 'DEFAULT_V2'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`cat\` DROP COLUMN \`v2\``);
    await queryRunner.query(
      `ALTER TABLE \`cat\` ADD \`v2\` varchar(255) NOT NULL DEFAULT 'DEFAULT'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cat\` CHANGE \`v2\` \`v1\` varchar(255) NOT NULL DEFAULT 'DEFAULT'`,
    );
  }
}
