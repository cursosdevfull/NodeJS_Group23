import { RedisBootstrap } from "@core/bootstraps/redis.bootstrap";
import * as crypto from "crypto";
import { NextFunction, Request, Response } from "express";

const generateUniqueKey = (
  idempotencyKey: string,
  body: Record<string, any>,
  method: string,
  path: string,
) => {
  const content = JSON.stringify({
    key: idempotencyKey,
    body,
    method,
    path,
  });

  return crypto.createHash("sha256").update(content).digest("hex");
};

export const idempotency = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method.toUpperCase() !== "POST") {
    return next();
  }

  const idempotencyKey = req.headers["x-idempotency-key"] as string;

  if (!idempotencyKey) {
    //return res.status(400).json({ message: "Idempotency key is required" });
    console.warn("Idempotency key is missing in the request headers");
    return next();
  }

  const uniqueKey = generateUniqueKey(
    idempotencyKey,
    req.body,
    req.method,
    req.path,
  );

  const cachedResponse = await RedisBootstrap.get(uniqueKey);

  if (cachedResponse) {
    console.log(`Idempotency cache hit for key: ${uniqueKey}`);
    const parsedResponse = JSON.parse(cachedResponse);
    return res.status(parsedResponse.status).json(parsedResponse.response);
  }

  const oldJson = res.json;
  let responseData: Record<string, any>;
  let statusCode = 200;

  res.json = function (data: any) {
    responseData = data;
    statusCode = res.statusCode;
    return oldJson.call(this, data);
  };

  res.on("finish", () => {
    if (statusCode >= 200 && statusCode < 300) {
      console.log(
        `Idempotency cache set for key: ${uniqueKey} with status: ${statusCode}`,
      );
      RedisBootstrap.set(
        uniqueKey,
        JSON.stringify({ status: statusCode, response: responseData }),
        60 * 60,
      );
    }
  });

  next();
};
