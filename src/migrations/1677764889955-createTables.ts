import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1677764889955 implements MigrationInterface {
    name = 'createTables1677764889955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "typeUser"`);
        await queryRunner.query(`DROP TYPE "public"."users_typeuser_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "typeUser" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "typeUser"`);
        await queryRunner.query(`CREATE TYPE "public"."users_typeuser_enum" AS ENUM('seller', 'buyer')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "typeUser" "public"."users_typeuser_enum" NOT NULL`);
    }

}
