import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/user.entity";
import { Comment } from "./entities/comments.entity";
import { ImageGalery } from "./entities/imageGalery.entity";
import { Vehicle } from "./entities/vehicle.entity";
import { Address } from "./entities/address.entity";
import { initialMigration1677789105913 } from "./migrations/1677789105913-initialMigration";
import { initialMigrations1677789903372 } from "./migrations/1677789903372-initialMigrations";
import { createTables1677807663093 } from "./migrations/1677807663093-createTables";
import { modificandoUser1677813345639 } from "./migrations/1677813345639-modificandoUser";

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test"
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
              entities: [User, Comment, ImageGalery, Vehicle, Address],
              migrations: [
                  initialMigration1677789105913,
                  initialMigrations1677789903372,
                  createTables1677807663093,
                  modificandoUser1677813345639
              ],
          }
);

export default AppDataSource;
