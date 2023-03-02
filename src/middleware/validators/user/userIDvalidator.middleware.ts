import { NextFunction, Request, Response } from "express";

const userIDvalidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id_token: string = req.user.id;
  const id_param: string = req.params.id;

  if (id_param !== id_token)
    return res.status(401).json({ error: "Unauthorized" });

  return next();
};

export default userIDvalidator;
