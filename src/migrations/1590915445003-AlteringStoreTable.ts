import {MigrationInterface, QueryRunner} from "typeorm";

export class AlteringStoreTable1590915445003 implements MigrationInterface {
    name = 'AlteringStoreTable1590915445003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "lattitude"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "longitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '"2020-05-31T08:57:26.688Z"'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '"2020-05-31T08:57:26.688Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "longitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "lattitude" character varying NOT NULL`);
    }

}
