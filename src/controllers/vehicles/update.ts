import { Request, Response } from "express";
import { updateVehicleService } from "../../services/vehicles/update";

const updateVehicleController = async (req: Request, res: Response) => {
  const vehicleId = req.params.id;
  const data = req.body;
  const updateData = await updateVehicleService(vehicleId, data);
  return res.status(200).json(updateData);
};

export { updateVehicleController };
