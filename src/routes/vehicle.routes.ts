import { Router } from "express";
import { deleteVehicleController } from "../controllers/vehicles/delete";
import { getVehicleController } from "../controllers/vehicles/get";
import { registerVehicleController } from "../controllers/vehicles/register";
import { updateVehicleController } from "../controllers/vehicles/update";

const vehicleRouter = Router();

vehicleRouter.post("/", registerVehicleController);
vehicleRouter.get("/", getVehicleController);
vehicleRouter.get("/:id", getVehicleController);
vehicleRouter.patch("/:id", updateVehicleController);
vehicleRouter.delete("/:id", deleteVehicleController);

export default vehicleRouter;
