import AppDataSource from "../../data-source";
import { Vehicle } from "../../entities/vehicle.entity";
import { AppError } from "../../errors/appErrors";
import { IVehicleUpdateRequest } from "../../interfaces/vehicle";
import { getRepoAndObject } from "../../utils/shorts";

const updateVehicleService = async (
  vehicleId: string,
  data: IVehicleUpdateRequest
) => {
  const { object: vehicle, repository: vehicleRepo } = await getRepoAndObject(
    Vehicle,
    vehicleId
  );
  const { description, km, title, value, year, imageGaleries } = data;

  vehicleRepo.update(vehicleId, {
    title: title ? title : vehicle.title,
    description: description ? description : vehicle.description,
    km: km ? km : vehicle.km,
    value: value ? value : vehicle.value,
    year: year ? year : vehicle.year,
    imageGaleries: imageGaleries ? imageGaleries : vehicle.imageGaleries,
  });

  const updatedData = await vehicleRepo.findOneBy({ id: vehicleId });

  return updatedData ? updatedData : vehicle;
};
export { updateVehicleService };
