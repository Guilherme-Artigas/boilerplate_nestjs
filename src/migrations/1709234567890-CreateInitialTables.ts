import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1709234567890 implements MigrationInterface {
  name = 'CreateInitialTables1709234567890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`company\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`phone\` varchar(14) NULL,
                \`email\` varchar(255) NOT NULL,
                \`document\` varchar(11) NOT NULL,
                UNIQUE INDEX \`IDX_company_email\` (\`email\`),
                UNIQUE INDEX \`IDX_company_document\` (\`document\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

    await queryRunner.query(`
            CREATE TABLE \`products\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL DEFAULT 'unkown product',
                \`description\` varchar(255) NULL,
                \`companyId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

    await queryRunner.query(`
            ALTER TABLE \`products\`
            ADD CONSTRAINT \`FK_products_company\`
            FOREIGN KEY (\`companyId\`)
            REFERENCES \`company\`(\`id\`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_products_company\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`company\``);
  }
}
