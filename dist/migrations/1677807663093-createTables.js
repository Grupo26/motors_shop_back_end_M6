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
exports.createTables1677807663093 = void 0;
class createTables1677807663093 {
    constructor() {
        this.name = 'createTables1677807663093';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "description"`);
            yield queryRunner.query(`ALTER TABLE "vehicles" ADD "description" character varying(2000) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "description"`);
            yield queryRunner.query(`ALTER TABLE "vehicles" ADD "description" character varying(300) NOT NULL`);
        });
    }
}
exports.createTables1677807663093 = createTables1677807663093;
