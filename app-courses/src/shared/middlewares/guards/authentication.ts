import { verifyAccessToken } from "@core/services";
import { NextFunction, Request, Response } from "express";

export const authenticationGuard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isValidToken = verifyAccessToken(token);
  if (!isValidToken.valid && !isValidToken.expired) {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (!isValidToken.valid && isValidToken.expired) {
    return res.status(401).json({ message: "Token expired" });
  }

  res.locals.user = isValidToken.payload;

  next();
};
