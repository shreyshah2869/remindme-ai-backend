import { Router } from "express";
import DefaultRouter from "./DefaultRouter.js";

const AppRouter = Router();

AppRouter.use("/", DefaultRouter);
AppRouter.use("/v1", DefaultRouter);

export default AppRouter;