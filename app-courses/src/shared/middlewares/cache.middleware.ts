import { RedisBootstrap } from "@core/bootstraps/redis.bootstrap";
import { NextFunction, Request, Response } from "express";

export const cache = (prefix: string) => {
  const getParameters = (params: Record<string, any>) => {
    return Object.values(params).join("_");
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    const oldJson = res.json;
    const parameters = {
      query: getParameters(req.query),
      params: getParameters(req.params),
      body: getParameters(req.body || {}),
    };

    const key = `${prefix}:${parameters.query}:${parameters.params}:${parameters.body}`;

    const cached = await RedisBootstrap.get(key);

    if (cached) {
      console.log(`Cache hit for key: ${key}`);
      return res.json(JSON.parse(cached));
    }

    res.json = function (data: any) {
      RedisBootstrap.set(key, JSON.stringify(data));
      console.log(`Cache set for key: ${key}`);
      return oldJson.call(this, data);
    };
    next();
  };
};
