import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccounts1755572954632 implements MigrationInterface {
    name = 'CreateAccounts1755572954632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`created_by\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`updated_by\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`role\` \`role\` enum ('admin', 'teacher', 'student') NOT NULL DEFAULT 'student'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`role\` \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`updated_by\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`created_by\``);
    }

}
