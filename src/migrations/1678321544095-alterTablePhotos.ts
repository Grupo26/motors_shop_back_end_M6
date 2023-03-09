import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTablePhotos1678321544095 implements MigrationInterface {
    name = 'alterTablePhotos1678321544095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" ADD "public_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP COLUMN "public_id"`);
    }

}
