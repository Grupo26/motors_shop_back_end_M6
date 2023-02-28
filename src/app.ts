import express from "express";
import handleErrorMiddleware from "./middleware/handleError.middleware";

const app = express();
app.use(express.json());
app.use(handleErrorMiddleware)

export default app;
