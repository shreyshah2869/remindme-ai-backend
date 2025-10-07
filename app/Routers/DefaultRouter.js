import { Router } from "express";
import { defaultController } from "../Controllers/DefaultController.js";

const DefaultRouter = Router();

DefaultRouter.get("/", defaultController);

export default DefaultRouter;