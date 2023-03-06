import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1677823944935 implements MigrationInterface {
    name = 'createTables1677823944935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImage" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "description" character varying(2000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "cep" SET DEFAULT '0000000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "cep" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "description" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImage"`);
    }

}
