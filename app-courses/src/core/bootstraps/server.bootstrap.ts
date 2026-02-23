import { env } from "@core/environment";
import { Application } from "express";
import http from "http";

export class ServerBootstrap {
  constructor(private readonly app: Application) {}

  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const PORT = env.PORT;

      const server = http.createServer(this.app);

      server
        .listen(PORT)
        .on("listening", () => {
          console.log(`Server is running on http://localhost:${PORT}`);
          resolve(true);
        })
        .on("error", (error) => {
          console.error("Server failed to start:", error);
          reject(error);
        });
    });
  }
}
