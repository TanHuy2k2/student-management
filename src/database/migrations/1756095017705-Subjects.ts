import { MigrationInterface, QueryRunner } from "typeorm";

export class Subjects1756095017705 implements MigrationInterface {
    name = 'Subjects1756095017705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subjects\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_47a287fe64bd0e1027e603c335\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_47a287fe64bd0e1027e603c335\` ON \`subjects\``);
        await queryRunner.query(`DROP TABLE \`subjects\``);
    }

}
