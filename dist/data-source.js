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
const photos_entity_1 = require("./entities/photos.entity");
const _1678321251644_createTables_1 = require("./migrations/1678321251644-createTables");
const _1678321544095_alterTablePhotos_1 = require("./migrations/1678321544095-alterTablePhotos");
const AppDataSource = new typeorm_1.DataSource(process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        synchronize: false,
        logging: true,
        entities: [user_entity_1.User, comments_entity_1.Comment, imageGalery_entity_1.ImageGalery, vehicle_entity_1.Vehicle, address_entity_1.Address, photos_entity_1.Photo],
        migrations: [
            _1677789105913_initialMigration_1.initialMigration1677789105913,
            _1678321251644_createTables_1.createTables1678321251644,
            _1678321544095_alterTablePhotos_1.alterTablePhotos1678321544095,
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
            entities: [user_entity_1.User, comments_entity_1.Comment, imageGalery_entity_1.ImageGalery, vehicle_entity_1.Vehicle, address_entity_1.Address, photos_entity_1.Photo],
            migrations: [
                _1677789105913_initialMigration_1.initialMigration1677789105913,
                _1678321251644_createTables_1.createTables1678321251644,
                _1678321544095_alterTablePhotos_1.alterTablePhotos1678321544095,
            ],
        });
exports.default = AppDataSource;
