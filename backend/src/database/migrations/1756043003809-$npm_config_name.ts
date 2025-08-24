import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1756043003809 implements MigrationInterface {
  name = ' $npmConfigName1756043003809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "created_ad"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updated_ad"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "updated_ad" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "created_ad" TIMESTAMP NOT NULL DEFAULT now()`);
  }
}
