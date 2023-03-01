import AppDataSource from "../../data-source";
import { Vehicle } from "../../entities/vehicle.entity";
import { AppError } from "../../errors/appErrors";

const retrieveVehicleService = async (vehicleId: string): Promise<Vehicle> => {
  const vehicleRepo = AppDataSource.getRepository(Vehicle);
  const vehicle = await vehicleRepo.findOneBy({ id: vehicleId });

  if (!vehicle) throw new AppError("Not Found", 404);

  return vehicle;
};

export { retrieveVehicleService };
