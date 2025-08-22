import { MigrationInterface, QueryRunner } from "typeorm";

export class Students1755749891389 implements MigrationInterface {
    name = 'Students1755749891389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`students\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`account_id\` int NULL, UNIQUE INDEX \`REL_55ea83776b20e951c82a0f18ad\` (\`account_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_55ea83776b20e951c82a0f18ad4\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_55ea83776b20e951c82a0f18ad4\``);
        await queryRunner.query(`DROP INDEX \`REL_55ea83776b20e951c82a0f18ad\` ON \`students\``);
        await queryRunner.query(`DROP TABLE \`students\``);
    }

}
