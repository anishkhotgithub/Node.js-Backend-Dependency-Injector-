import { Container } from "typedi";
import loggerLoader from "./logger";
import dbLoader from "./db";
import models from "../api/model"; // array of models

export default async () => {
  // 1. Logger
  const logger = loggerLoader();
  Container.set("logger", logger);

  // 2. Database connection (Mongo)
  const dbConnection = await dbLoader();
  Container.set("mongoConnection", dbConnection);

  // 3. Register models dynamically
  models.forEach((m) => {
    // Call the factory (your `auth.ts` returns a model factory)
    const modelInstance = m.model(); // default `communityName` = "data"
    Container.set(m.name, modelInstance);
  });

  //4. ThrowError
  const throwError = (code = 500, message = "huh!") => {
    let error: any = new Error(message);
    error.status = code;
    throw error;
  };

  Container.set("throwError", throwError);

  logger.info("✅ All loaders initialized & dependencies registered.");
};
