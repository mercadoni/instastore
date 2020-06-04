import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1591202141264 implements MigrationInterface {
  name = "CreateTables1591202141264";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "is_open" boolean NOT NULL DEFAULT true, "latitude" numeric(8,3) NOT NULL, "longitude" numeric(8,3) NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2020-06-03T16:35:43.024Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2020-06-03T16:35:43.024Z"', CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "store"`);
  }
}
