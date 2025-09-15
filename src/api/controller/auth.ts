import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth";
import Container from "typedi";
import { Logger } from "winston";

class authController {
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get("logger");
    try {
      const authServiceInstance = Container.get(AuthService);
      const students = await authServiceInstance.createAuth(req.body);
      res.status(200).json({
        code: 200,
        message: "success",
        data: students,
      });
    } catch (error) {
      logger.error("🔥 error: %o", JSON.stringify(error));
      res.status(200).json({
        code: 200,
        message: "success",
        error: error,
      });
    }
  };
}
export default new authController();
