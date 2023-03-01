import { Request, Response } from "express";
import { registerVehicleService } from "../../services/vehicles/register";

const registerVehicleController = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user.id;
  const vehicle = await registerVehicleService(data, userId);
  return res.status(201).json(vehicle);
};
export { registerVehicleController };
