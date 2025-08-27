import { MigrationInterface, QueryRunner } from "typeorm";

export class ScoreRoomSchedule1756279941794 implements MigrationInterface {
    name = 'ScoreRoomSchedule1756279941794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scores\` DROP FOREIGN KEY \`FK_aabada3b85a16b1d139f2cef3d5\``);
        await queryRunner.query(`CREATE TABLE \`rooms\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_48b79438f8707f3d9ca83d85ea\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schedules\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`start_time\` datetime NOT NULL, \`end_time\` datetime NOT NULL, \`subject_id\` int NULL, \`teacher_id\` int NULL, \`room_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`scores\` DROP COLUMN \`student_subject_id\``);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD \`subject_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD \`student_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_0d4aea6fb531a16d5f953f79000\` FOREIGN KEY (\`subject_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_cfacddd81efeda13acadb93d42b\` FOREIGN KEY (\`teacher_id\`) REFERENCES \`teachers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_017c44638c80d285dd42221f460\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD CONSTRAINT \`FK_f40b99b83783c6fff949f32ffc3\` FOREIGN KEY (\`subject_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD CONSTRAINT \`FK_45a2f5190af9a5e59f837e62d52\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scores\` DROP FOREIGN KEY \`FK_45a2f5190af9a5e59f837e62d52\``);
        await queryRunner.query(`ALTER TABLE \`scores\` DROP FOREIGN KEY \`FK_f40b99b83783c6fff949f32ffc3\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_017c44638c80d285dd42221f460\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_cfacddd81efeda13acadb93d42b\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_0d4aea6fb531a16d5f953f79000\``);
        await queryRunner.query(`ALTER TABLE \`scores\` DROP COLUMN \`student_id\``);
        await queryRunner.query(`ALTER TABLE \`scores\` DROP COLUMN \`subject_id\``);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD \`student_subject_id\` int NULL`);
        await queryRunner.query(`DROP TABLE \`schedules\``);
        await queryRunner.query(`DROP INDEX \`IDX_48b79438f8707f3d9ca83d85ea\` ON \`rooms\``);
        await queryRunner.query(`DROP TABLE \`rooms\``);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD CONSTRAINT \`FK_aabada3b85a16b1d139f2cef3d5\` FOREIGN KEY (\`student_subject_id\`) REFERENCES \`student_subject\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
