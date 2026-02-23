import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { showMessageErrors } from "../utils/show-message-errors";

type ItemScheme = {
  validator: new (...args: any[]) => any;
  kindOfParameters: "body" | "params" | "query";
};

export const validationSchemes = (...items: ItemScheme[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const item of items) {
      const scheme = plainToInstance(
        item.validator,
        req[item.kindOfParameters],
      );

      const validationErrors = await validate(scheme, {
        whitelist: true,
      });
      if (validationErrors.length > 0) {
        const result = showMessageErrors(validationErrors);
        errors.push(...result);
      } else {
        //req[item.kindOfParameters] = scheme;
      }
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    next();
  };
};
