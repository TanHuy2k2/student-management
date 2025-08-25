import { MigrationInterface, QueryRunner } from "typeorm";

export class Teachers1755848415017 implements MigrationInterface {
    name = 'Teachers1755848415017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`teachers\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`account_id\` int NULL, UNIQUE INDEX \`REL_5ea5e63ed0862453e5b182d284\` (\`account_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`teachers\` ADD CONSTRAINT \`FK_5ea5e63ed0862453e5b182d284a\` FOREIGN KEY (\`account_id\`) REFERENCES \`accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teachers\` DROP FOREIGN KEY \`FK_5ea5e63ed0862453e5b182d284a\``);
        await queryRunner.query(`DROP INDEX \`REL_5ea5e63ed0862453e5b182d284\` ON \`teachers\``);
        await queryRunner.query(`DROP TABLE \`teachers\``);
    }

}
