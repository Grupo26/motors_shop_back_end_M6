import { Request, Response } from "express";
import { deleteVehicleService } from "../../services/vehicles/delete";

const deleteVehicleController = async (req: Request, res: Response) => {
  const vehicleId = req.params.id;
  await deleteVehicleService(vehicleId);
  return res.status(204).send();
};
export { deleteVehicleController };
