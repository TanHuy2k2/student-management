import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccounts1755747888849 implements MigrationInterface {
    name = 'CreateAccounts1755747888849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`created_by\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`updated_by\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`updated_by\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`updatedBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
