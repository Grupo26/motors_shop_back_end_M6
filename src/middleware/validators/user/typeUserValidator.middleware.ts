import { NextFunction, Request, Response } from "express";

const typeUserValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const typeUser: string = req.user.typeUser;

  if (typeUser !== "seller")
    return res.status(401).json({ error: "Unauthorized" });

  return next();
};

export default typeUserValidator;
