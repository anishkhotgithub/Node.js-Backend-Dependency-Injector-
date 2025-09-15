import mongoose from "mongoose";

export default async () => {
  const connection = await mongoose.connect(
    process.env.DATABASE_URL as string,
    {
      dbName: process.env.DB_NAME,
    }
  );

  return connection.connection; // return mongoose connection
};
