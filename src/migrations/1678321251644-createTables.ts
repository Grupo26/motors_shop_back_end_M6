import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1678321251644 implements MigrationInterface {
    name = 'createTables1678321251644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "urlImage" character varying(300) NOT NULL, "imageGaleryId" uuid, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image_galeries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_04b5e4fd423926b29d5cd338996" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "adType" character varying, "title" character varying(60) NOT NULL, "description" character varying(2000) NOT NULL, "km" numeric NOT NULL, "year" integer NOT NULL, "value" numeric NOT NULL, "imageGaleryId" uuid, "usersId" uuid, CONSTRAINT "REL_c8a353e9281bd2da8badd9e08e" UNIQUE ("imageGaleryId"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying(300) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "usersId" uuid, "vehiclesId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(11) NOT NULL DEFAULT '0000000', "state" character varying(40) NOT NULL, "city" character varying(80) NOT NULL, "street" character varying(200) NOT NULL, "number" character varying(10) DEFAULT 'S/N', "complement" character varying(20), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "profileImage" character varying(300), "email" character varying(100) NOT NULL, "cpf" character varying(15) NOT NULL, "phone" character varying(15) NOT NULL, "birthdate" character varying(20) NOT NULL, "description" character varying(250), "password" character varying(150) NOT NULL, "typeUser" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_e53cef540b87c278c4b9a2134cb" FOREIGN KEY ("imageGaleryId") REFERENCES "image_galeries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_c8a353e9281bd2da8badd9e08ea" FOREIGN KEY ("imageGaleryId") REFERENCES "image_galeries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_67d9d12ce3c9281601cb3158dd2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_065338fbfc15984038082f46bd1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_cea5579f54ff505d8222a11454e" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_cea5579f54ff505d8222a11454e"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_065338fbfc15984038082f46bd1"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_67d9d12ce3c9281601cb3158dd2"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_c8a353e9281bd2da8badd9e08ea"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_e53cef540b87c278c4b9a2134cb"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "image_galeries"`);
        await queryRunner.query(`DROP TABLE "photos"`);
    }

}
