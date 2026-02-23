import { env } from "@core/environment";
import path from "path";
import { DataSource } from "typeorm";

export class DatabaseBootstrap {
  static dataSource: DataSource;

  async initialize(): Promise<string> {
    const ds = new DataSource({
      type: "mysql",
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      synchronize: env.DB_SYNCHRONIZE,
      logging: env.DB_LOGGING,
      entities: [
        path.join(
          __dirname,
          "../../features/**/adapters/persistence/*.entity.{ts,js}",
        ),
      ],
    });

    const result = await ds.initialize();

    DatabaseBootstrap.dataSource = ds;

    console.log("Database connected successfully");

    return "Database connected successfully";
  }
}
