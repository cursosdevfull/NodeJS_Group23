import "dotenv/config";
import { z } from "zod/v4";

const envSchema = z.object({
  PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_SYNCHRONIZE: z
    .string()
    .transform((val) => val === "true" || val === "1"),
  DB_LOGGING: z
    .string()
    .transform((val) => val === "true" || val === "1"),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
