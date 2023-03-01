import { Vehicle } from "../../entities/vehicle.entity";
import { getObjectOr404 } from "../../utils/shorts";

export const deleteVehicleService = async (vehicleId: string) => {
  const { object } = await getObjectOr404(Vehicle, vehicleId);
  await object.delete();
};
