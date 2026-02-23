import { NextFunction, Request, Response } from "express";

function filterProperties(input: any, keysToExclude: string[]): any {
  if (Array.isArray(input)) {
    return input.map((item) => filterProperties(item, keysToExclude));
  } else if (typeof input === "object" && input !== null) {
    const filtered: Record<string, any> = {};
    for (const key in input) {
      if (input[key] !== undefined && !keysToExclude.includes(key)) {
        filtered[key] = filterProperties(input[key], keysToExclude);
      }
    }
    return filtered;
  } else {
    return input;
  }
}

export const filterResponse =
  (
    fieldsToExclude: string[] = [
      "active",
      "createdAt",
      "updatedAt",
      "password",
    ],
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const oldJson = res.json;

    res.json = function (data: any) {
      const statusCode = res.statusCode || 200;

      let responseData: Record<string, any>;

      if (statusCode >= 400) {
        responseData = data;
      } else {
        responseData = filterProperties(data, fieldsToExclude);
        console.log("Response data after filtering:", responseData);
      }

      return oldJson.call(this, responseData);
    };

    next();
  };
