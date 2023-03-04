"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
const user_entity_1 = require("./entities/user.entity");
const comments_entity_1 = require("./entities/comments.entity");
const imageGalery_entity_1 = require("./entities/imageGalery.entity");
const vehicle_entity_1 = require("./entities/vehicle.entity");
const address_entity_1 = require("./entities/address.entity");
const _1677789105913_initialMigration_1 = require("./migrations/1677789105913-initialMigration");
const _1677789903372_initialMigrations_1 = require("./migrations/1677789903372-initialMigrations");
const _1677807663093_createTables_1 = require("./migrations/1677807663093-createTables");
const _1677813345639_modificandoUser_1 = require("./migrations/1677813345639-modificandoUser");
const AppDataSource = new typeorm_1.DataSource(process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        synchronize: false,
        logging: true,
        entities: [user_entity_1.User, comments_entity_1.Comment, imageGalery_entity_1.ImageGalery, vehicle_entity_1.Vehicle, address_entity_1.Address],
        migrations: [
            _1677789105913_initialMigration_1.initialMigration1677789105913,
            _1677789903372_initialMigrations_1.initialMigrations1677789903372,
            _1677807663093_createTables_1.createTables1677807663093,
            _1677813345639_modificandoUser_1.modificandoUser1677813345639,
        ],
    }
    : process.env.NODE_ENV === "test"
        ? {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: ["src/entities/*.ts"],
        }
        : {
            type: "postgres",
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            logging: true,
            synchronize: false,
            entities: [user_entity_1.User, comments_entity_1.Comment, imageGalery_entity_1.ImageGalery, vehicle_entity_1.Vehicle, address_entity_1.Address],
            migrations: [
                _1677789105913_initialMigration_1.initialMigration1677789105913,
                _1677789903372_initialMigrations_1.initialMigrations1677789903372,
                _1677807663093_createTables_1.createTables1677807663093,
                _1677813345639_modificandoUser_1.modificandoUser1677813345639,
            ],
        });
exports.default = AppDataSource;
