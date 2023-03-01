import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Vehicle } from "../../entities/vehicle.entity";
import { IVehicleRequest, IVehicleResponse } from "../../interfaces/vehicle";
import { AppError } from "../../errors/appErrors";

export const registerVehicleService = async (data: Vehicle, userId: string) => {
  const vehicleRepo = AppDataSource.getRepository(Vehicle);
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: userId });

  if (!user) throw new AppError("Not Found", 404);

  data.users = user;

  const newVehicle = vehicleRepo.create(data);

  await vehicleRepo.save(newVehicle);

  const vehicle = await vehicleRepo.findOneBy({ id: newVehicle.id });

  return vehicle;
};
