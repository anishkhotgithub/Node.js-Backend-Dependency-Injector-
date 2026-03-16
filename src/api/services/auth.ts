import { Service, Inject } from "typedi";
import { Logger } from "winston";
import { CreateAuthSchema } from "../types/auth";
import Helper from "../../helper";
import mongoose from "mongoose";
import * as z from "zod";

@Service()
export default class AuthService {
  constructor(
    @Inject("throwError")
    private throwError: (code?: number, message?: string) => never,
    @Inject("logger") private logger: Logger,
    @Inject("authModel") private authModel: mongoose.Model<any>
  ) {}

  async createAuth(req: any): Promise<{ user: any }> {
    let doc = {};
    try {
      const zod = CreateAuthSchema.parse(req);
      doc = await this.authModel.create(zod);
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw err.issues;
      }
      this.logger.error(err);
      this.throwError(Helper.StatusCode.InternalError, "Something went wrong");
    }
    return { user: doc };
  }

  async getUsers(req: any): Promise<{ user: any }> {
    let doc = {};
    try {
      console.log("test");
      doc = await this.authModel.find({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw err.issues;
      }
      this.logger.error(err);
      this.throwError(Helper.StatusCode.InternalError, "Something went wrong");
    }
    return { user: doc };
  }
}
