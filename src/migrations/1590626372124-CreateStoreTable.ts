import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStoreTable1590626372124 implements MigrationInterface {
    name = 'CreateStoreTable1590626372124'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "is_open" boolean NOT NULL DEFAULT true, "lattitude" character varying NOT NULL, "longitude" character varying NOT NULL, "city" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "store"`, undefined);
    }

}
