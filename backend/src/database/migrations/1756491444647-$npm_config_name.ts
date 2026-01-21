import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1756491444647 implements MigrationInterface {
  name = ' $npmConfigName1756491444647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "surname" character varying(255)`);
  }
}
