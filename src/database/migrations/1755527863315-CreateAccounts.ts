import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccounts1755527863315 implements MigrationInterface {
    name = 'CreateAccounts1755527863315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '2', \`image\` varchar(255) NULL, UNIQUE INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}
