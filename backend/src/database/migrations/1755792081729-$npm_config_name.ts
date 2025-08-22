import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1755792081729 implements MigrationInterface {
  name = ' $npmConfigName1755792081729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "done" boolean NOT NULL DEFAULT false, "priority" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task_entity"`);
  }
}
