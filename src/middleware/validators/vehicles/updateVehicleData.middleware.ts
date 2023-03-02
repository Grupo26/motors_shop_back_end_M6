import { NextFunction, Request, Response } from "express";
import { updateVehicleSerializer } from "../../../serializers/vehicle";

const updateVehicleDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  try {
    const validatedData = await updateVehicleSerializer.validate(data, {
      abortEarly: true,
      stripUnknown: false,
    });

    req.body = validatedData;
    return next();
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export { updateVehicleDataValidator };
