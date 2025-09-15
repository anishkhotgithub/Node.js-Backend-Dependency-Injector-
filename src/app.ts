import "reflect-metadata";
import express from "express";
import config from "./api/config/config";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./api/index";
import loaders from "./loaders"; // 👈 add loaders

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Initialize DI (logger, DB, models)
  await loaders();

  // Routes
  app.use(config.api.prefix, routes());

  app.listen(PORT, () => {
    console.log(`
        ##########################################
        🛡️  Server listening on port: ${PORT} 🛡️
        ##########################################
    `);
  });
}

startServer();
