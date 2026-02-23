import "@core/environment/env";
import "reflect-metadata";
import { app, appInstance } from "./app";

import { DatabaseBootstrap } from "@core/bootstraps/database.bootstrap";
import { RedisBootstrap } from "@core/bootstraps/redis.bootstrap";
import { ServerBootstrap } from "./core/bootstraps";

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseBootstrap = new DatabaseBootstrap();
  const redisBootstrap = new RedisBootstrap();

  const promises = [
    databaseBootstrap.initialize(),
    redisBootstrap.initialize(),
  ];

  try {
    await Promise.all(promises);

    // Inicializar rutas después de que la base de datos esté lista
    appInstance.initializeRoutes();

    await serverBootstrap.initialize();
    console.log("Application started successfully.");
  } catch (error) {
    console.error("Error during application startup:", error);
    process.exit(1);
  }
})();

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Leaving...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Leaving...");
  process.exit(0);
});

process.on("exit", () => {
  console.log("Process exit");
  console.log("Terminating process pending");
});
