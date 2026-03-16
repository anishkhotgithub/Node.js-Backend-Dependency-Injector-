import { Router } from "express";
import authController from "../controller/auth";
const router = Router();
export default (app: Router) => {
  app.use("/auth", router);
  router.post("/createUser", authController.createUser);
  //   router.post("/loginUser", authController.loginUser);
  router.post("/getUsers", authController.getUser);
};
