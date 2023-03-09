import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middleware/handleError.middleware";
import loginRoutes from "./routes/login.route";
import usersRoutes from "./routes/users.route";
import cors from "cors";
import vehicleRoutes from "./routes/vehicle.route";
import commentRoutes from "./routes/comments.route";
import commentsRoutes from "./routes/commentsPartII.route";
import imagesRouter from "./routes/images.route";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/vehicle", commentRoutes);
app.use("/comments", commentsRoutes);
app.use("/images", imagesRouter);
app.use(handleErrorMiddleware);

export default app;

