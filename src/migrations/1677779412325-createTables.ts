import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1677779412325 implements MigrationInterface {
    name = 'createTables1677779412325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_f75e99ed0e5883d74050628ed82"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "REL_f75e99ed0e5883d74050628ed8"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_bafb08f60d7857f4670c172a6ea" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "usersId" uuid`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "REL_f75e99ed0e5883d74050628ed8" UNIQUE ("usersId")`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_f75e99ed0e5883d74050628ed82" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
