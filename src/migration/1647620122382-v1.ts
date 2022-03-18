import { MigrationInterface, QueryRunner } from 'typeorm';

export class v11647620122382 implements MigrationInterface {
  name = 'v11647620122382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cat\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`v1\` varchar(255) NOT NULL DEFAULT 'DEFAULT', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`cat\``);
  }
}
