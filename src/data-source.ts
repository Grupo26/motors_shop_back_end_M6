import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/user.entity";
import { Comment } from "./entities/comments.entity";
import { ImageGalery } from "./entities/imageGalery.entity";
import { Vehicle } from "./entities/vehicle.entity";
import { Address } from "./entities/address.entity";
import { initialMigration1677789105913 } from "./migrations/1677789105913-initialMigration";
import { Photo } from "./entities/photos.entity";
import { createTables1678321251644 } from "./migrations/1678321251644-createTables";
import { alterTablePhotos1678321544095 } from "./migrations/1678321544095-alterTablePhotos";

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "production"
        ? {
              type: "postgres",
              url: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false },
              synchronize: false,
              logging: true,
              entities: [User, Comment, ImageGalery, Vehicle, Address, Photo],
              migrations: [
                  initialMigration1677789105913,
                  createTables1678321251644,
                  alterTablePhotos1678321544095,
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
              entities: [User, Comment, ImageGalery, Vehicle, Address, Photo],
              migrations: [
                  initialMigration1677789105913,
                  createTables1678321251644,
                  alterTablePhotos1678321544095,
              ],
          }
);

export default AppDataSource;

