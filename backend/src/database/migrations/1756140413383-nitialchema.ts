import { MigrationInterface, QueryRunner } from 'typeorm';

export class Nitialchema1756140413383 implements MigrationInterface {
  name = 'Nitialchema1756140413383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tasks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" character varying,
                "done" boolean NOT NULL DEFAULT false,
                "priority" integer NOT NULL DEFAULT 1,
                CONSTRAINT "PK_tasks_id" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
