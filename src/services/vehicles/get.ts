import AppDataSource from "../../data-source";
import { Vehicle } from "../../entities/vehicle.entity";

const getVehicleService = async (): Promise<Vehicle[]> => {
  const vehicleRepo = AppDataSource.getRepository(Vehicle);
  const vehicles = await vehicleRepo.find();
  return vehicles;
};
export { getVehicleService };
