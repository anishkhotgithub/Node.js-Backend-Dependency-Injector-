import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.DATABASE_URL as string);
      console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      process.exit(1);
    }
  }
}
