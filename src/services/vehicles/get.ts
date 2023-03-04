import AppDataSource from "../../data-source";
import { Vehicle } from "../../entities/vehicle.entity";

const getVehicleService = async (): Promise<Vehicle[]> => {
  const vehicleRepo = AppDataSource.getRepository(Vehicle);
//   const vehicles = await vehicleRepo.find();
  const vehicles = await vehicleRepo.find({ relations: ["users", "comments"] })
  return vehicles;
};
export { getVehicleService };
