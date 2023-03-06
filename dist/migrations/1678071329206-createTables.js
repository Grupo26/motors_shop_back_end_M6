"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables1678071329206 = void 0;
class createTables1678071329206 {
    constructor() {
        this.name = 'createTables1678071329206';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "image_galeries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "urlImage" character varying(300) NOT NULL, "vehiclesId" uuid, CONSTRAINT "PK_04b5e4fd423926b29d5cd338996" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."vehicles_type_enum" AS ENUM('motorcycle', 'car')`);
            yield queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."vehicles_type_enum" NOT NULL, "imgCap" character varying(250) NOT NULL, "title" character varying(60) NOT NULL, "description" character varying(2000) NOT NULL, "km" numeric NOT NULL, "year" integer NOT NULL, "value" numeric NOT NULL, "usersId" uuid, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying(300) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "usersId" uuid, "vehiclesId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(11) NOT NULL DEFAULT '0000000', "state" character varying(40) NOT NULL, "city" character varying(80) NOT NULL, "street" character varying(200) NOT NULL, "number" character varying(10) DEFAULT 'S/N', "complement" character varying(20), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "profileImage" character varying(300), "email" character varying(100) NOT NULL, "cpf" character varying(15) NOT NULL, "phone" character varying(15) NOT NULL, "birthdate" character varying(20) NOT NULL, "description" character varying(250), "password" character varying(150) NOT NULL, "typeUser" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "image_galeries" ADD CONSTRAINT "FK_6bb534dd0434122f2658d66afcf" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_67d9d12ce3c9281601cb3158dd2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_065338fbfc15984038082f46bd1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_cea5579f54ff505d8222a11454e" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
            yield queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_cea5579f54ff505d8222a11454e"`);
            yield queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_065338fbfc15984038082f46bd1"`);
            yield queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_67d9d12ce3c9281601cb3158dd2"`);
            yield queryRunner.query(`ALTER TABLE "image_galeries" DROP CONSTRAINT "FK_6bb534dd0434122f2658d66afcf"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "addresses"`);
            yield queryRunner.query(`DROP TABLE "comments"`);
            yield queryRunner.query(`DROP TABLE "vehicles"`);
            yield queryRunner.query(`DROP TYPE "public"."vehicles_type_enum"`);
            yield queryRunner.query(`DROP TABLE "image_galeries"`);
        });
    }
}
exports.createTables1678071329206 = createTables1678071329206;
