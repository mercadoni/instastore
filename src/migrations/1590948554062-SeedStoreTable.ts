import {
  createQueryBuilder,
  getConnection,
  getRepository,
  MigrationInterface,
  QueryRunner,
} from "typeorm";
import { StoreSeed } from "../seeds/stores.seed";
import { Store } from "../entities/Store";

export class SeedStoreTable1590948554062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // const stores = await getRepository("Store").save(StoreSeed);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Store)
      .values(StoreSeed)
      .execute();
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
