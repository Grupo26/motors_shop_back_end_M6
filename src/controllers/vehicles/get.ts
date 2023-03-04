import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { getVehicleService } from "../../services/vehicles/get";
import { retrieveVehicleService } from "../../services/vehicles/retrieve";

const getVehicleController = async (req: Request, res: Response) => {
  const vehicleId = req.params.id;
  const data = [];

  if (vehicleId) {
    const vehicle = await retrieveVehicleService(vehicleId);
    data.push(vehicle);
    return res.status(200).json(instanceToPlain(data[0]));
  }

  const vehicles = await getVehicleService();
  data.push(vehicles);

  return res.status(200).json(instanceToPlain(data[0]));
};
export { getVehicleController };
