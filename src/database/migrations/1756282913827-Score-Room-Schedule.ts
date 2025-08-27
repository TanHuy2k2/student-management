import { MigrationInterface, QueryRunner } from "typeorm";

export class ScoreRoomSchedule1756282913827 implements MigrationInterface {
    name = 'ScoreRoomSchedule1756282913827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`scores\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`attendance\` float NOT NULL DEFAULT '0', \`midterm\` float NOT NULL DEFAULT '0', \`final\` float NOT NULL DEFAULT '0', \`subject_id\` int NULL, \`student_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD CONSTRAINT \`FK_f40b99b83783c6fff949f32ffc3\` FOREIGN KEY (\`subject_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD CONSTRAINT \`FK_45a2f5190af9a5e59f837e62d52\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scores\` DROP FOREIGN KEY \`FK_45a2f5190af9a5e59f837e62d52\``);
        await queryRunner.query(`ALTER TABLE \`scores\` DROP FOREIGN KEY \`FK_f40b99b83783c6fff949f32ffc3\``);
        await queryRunner.query(`DROP TABLE \`scores\``);
    }

}
