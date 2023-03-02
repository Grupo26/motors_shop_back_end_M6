import { NextFunction, Request, Response } from "express";
import { registerUserSerializer } from "../../../serializers/user";

const registerUserDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  try {
    const validatedData = await registerUserSerializer.validate(data, {
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

export { registerUserDataValidator };
