import { Router } from "express";
import { getVehicleController } from "../controllers/vehicles/get";
import { registerVehicleController } from "../controllers/vehicles/register";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";


const vehicleRoutes = Router();

vehicleRoutes.post('', ensureAuthMiddleware, registerVehicleController);
vehicleRoutes.get('', getVehicleController)
vehicleRoutes.get('/:id', getVehicleController)

export default vehicleRoutes;