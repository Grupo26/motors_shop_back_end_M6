import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1677807663093 implements MigrationInterface {
    name = 'createTables1677807663093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "description" character varying(2000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "description" character varying(300) NOT NULL`);
    }

}
