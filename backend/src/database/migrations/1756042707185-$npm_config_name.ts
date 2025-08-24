import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1756042707185 implements MigrationInterface {
  name = ' $npmConfigName1756042707185';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "created_ad" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "updated_ad" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updated_ad"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "created_ad"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }
}
