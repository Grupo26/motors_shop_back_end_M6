import { Router } from "express";
import { deleteVehicleController } from "../controllers/vehicles/delete";
import { getVehicleController } from "../controllers/vehicles/get";
import { registerVehicleController } from "../controllers/vehicles/register";
import { updateVehicleController } from "../controllers/vehicles/update";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import uploadImageMiddleware from "../middleware/uploadImage.middlewares";

const vehicleRoutes = Router();

vehicleRoutes.post(
    "",
    ensureAuthMiddleware,
    uploadImageMiddleware.array("imageGalery"),
    registerVehicleController
);
vehicleRoutes.get("", getVehicleController);
vehicleRoutes.get("/:id", getVehicleController);
vehicleRoutes.patch("/:id", ensureAuthMiddleware, updateVehicleController);
vehicleRoutes.delete("/:id", ensureAuthMiddleware, deleteVehicleController);

export default vehicleRoutes;

