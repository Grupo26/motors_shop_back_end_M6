import "reflect-metadata"
import "express-async-errors"
import express from "express";
import handleErrorMiddleware from "./middleware/handleError.middleware";
import loginRoutes from "./routes/login.route";
import usersRoutes from "./routes/users.route";
import cors from "cors"
import vehicleRouter from "./routes/vehicle.routes";

const app = express();
app.use(express.json());
app.use(handleErrorMiddleware);
app.use(cors())

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use("/vehicles", vehicleRouter);

export default app;
