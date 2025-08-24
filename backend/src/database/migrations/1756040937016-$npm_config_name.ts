import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1756040937016 implements MigrationInterface {
  name = ' $npmConfigName1756040937016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "createdAt"`);
  }
}
