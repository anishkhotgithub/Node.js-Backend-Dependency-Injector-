import { Router } from "express";

import auth from "./router/auth";
// import movie from "./router/movie";
export default () => {
  const router = Router();
  auth(router);
  // movie(router);
  return router;
};
