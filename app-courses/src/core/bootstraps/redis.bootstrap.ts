import { env } from "@core/environment";
import IORedis from "ioredis";

export class RedisBootstrap {
  static client: IORedis;

  async initialize(): Promise<string> {
    return new Promise((resolve, reject) => {
      RedisBootstrap.client = new IORedis({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
      });

      RedisBootstrap.client.on("connect", () => {
        console.log("Redis connected successfully");
        resolve("Redis connected successfully");
      });

      RedisBootstrap.client.on("error", (err) => {
        console.error("Redis connection error:", err);
        reject(err);
      });
    });
  }

  static async get(key: string) {
    return this.client.get(key);
  }

  static async set(key: string, value: string, seconds: number = 24 * 60 * 60) {
    this.client.set(key, value, "EX", seconds);
  }

  static async clear(prefix: string) {
    const keys = await this.client.keys(`${prefix}*`);
    console.log(`Clearing cache for keys: ${keys.join(", ")}`);
    const pipeline = this.client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
