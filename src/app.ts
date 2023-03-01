import express from "express";
import handleErrorMiddleware from "./middleware/handleError.middleware";
import vehicleRouter from "./routes/vehicle.routes";

const app = express();
app.use(express.json());
app.use(handleErrorMiddleware);

app.use("/vehicles", vehicleRouter);

export default app;
