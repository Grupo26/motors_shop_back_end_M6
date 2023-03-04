import { MigrationInterface, QueryRunner } from "typeorm";

export class modificandoUser1677813345639 implements MigrationInterface {
    name = 'modificandoUser1677813345639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImage" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImage"`);
    }

}
