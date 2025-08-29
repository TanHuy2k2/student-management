import { MigrationInterface, QueryRunner } from "typeorm";

export class ScheduleScore1756461059437 implements MigrationInterface {
    name = 'ScheduleScore1756461059437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`schedules\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`day_of_week\` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`student_id\` int NULL, \`subject_id\` int NULL, \`teacher_id\` int NULL, \`room_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`scores\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`attendance\` float NOT NULL DEFAULT '0', \`midterm\` float NOT NULL DEFAULT '0', \`final\` float NOT NULL DEFAULT '0', \`subject_id\` int NULL, \`student_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_6765d0dfdcd72d7de40958d06a7\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_ea337fc21e4c484e86392809d79\` FOREIGN KEY (\`subject_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_2c027020a88187efddd0dbb8421\` FOREIGN KEY (\`teacher_id\`) REFERENCES \`teachers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_2b9a68c93adbc74afa109bb2a73\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD CONSTRAINT \`FK_f40b99b83783c6fff949f32ffc3\` FOREIGN KEY (\`subject_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scores\` ADD CONSTRAINT \`FK_45a2f5190af9a5e59f837e62d52\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scores\` DROP FOREIGN KEY \`FK_45a2f5190af9a5e59f837e62d52\``);
        await queryRunner.query(`ALTER TABLE \`scores\` DROP FOREIGN KEY \`FK_f40b99b83783c6fff949f32ffc3\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_2b9a68c93adbc74afa109bb2a73\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_2c027020a88187efddd0dbb8421\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_ea337fc21e4c484e86392809d79\``);
        await queryRunner.query(`ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_6765d0dfdcd72d7de40958d06a7\``);
        await queryRunner.query(`DROP TABLE \`scores\``);
        await queryRunner.query(`DROP TABLE \`schedules\``);
    }

}
