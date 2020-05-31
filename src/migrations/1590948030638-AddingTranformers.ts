import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingTranformers1590948030638 implements MigrationInterface {
    name = 'AddingTranformers1590948030638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "latitude" numeric(8,3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "longitude" numeric(8,3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '"2020-05-31T18:00:34.479Z"'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '"2020-05-31T18:00:34.479Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '2020-05-31 17:42:30.677'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '2020-05-31 17:42:30.677'`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "longitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "latitude" integer NOT NULL`);
    }

}
