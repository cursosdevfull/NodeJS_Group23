import { NextFunction, Request, Response } from "express";

export const authorizationGuard = (...rolesAllowed: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    const roles = user.roles.map((role: any) => role.name);

    const hasRole = roles.some((role: string) => rolesAllowed.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
