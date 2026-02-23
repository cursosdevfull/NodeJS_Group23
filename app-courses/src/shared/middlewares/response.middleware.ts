import { NextFunction, Request, Response } from "express";

type ResponseData =
  | { status: "success"; data: any }
  | { status: "error"; errors: any };

export const response = (req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json;

  res.json = function (data: any) {
    const statusCode = res.statusCode || 200;

    let responseData: ResponseData;

    if (statusCode >= 400) {
      responseData = {
        status: "error",
        errors: data,
      };
    } else {
      responseData = {
        status: "success",
        data: data,
      };
    }

    return oldJson.call(this, responseData);
  };
  
  next();
};
