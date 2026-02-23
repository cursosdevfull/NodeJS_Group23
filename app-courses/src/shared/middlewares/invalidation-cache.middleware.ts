import { RedisBootstrap } from "@core/bootstraps/redis.bootstrap";
import { Request, Response } from "express";

export const invalidationCache = (prefix: string) => {
  return (req: Request, res: Response, next: Function) => {
    const oldJson = res.json;

    res.json = function (data: any) {
      console.log(`Cache cleared for prefix: ${prefix}`);
      return oldJson.call(this, data);
    };

    res.on("finish", async () => {
      console.log(`Cache cleared for prefix: ${prefix}`);
      await RedisBootstrap.clear(prefix);
    });

    next();
  };
};
