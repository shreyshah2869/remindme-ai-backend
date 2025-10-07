import express from "express";
import AppRouter from "./Routers/index.js";
import { requestMiddleware } from "./Middlewares/APIRequestMiddleware.js";

const app = express();

app.use(express.json());

app.use(requestMiddleware);
app.use(AppRouter);

app.listen(8000, () => {
    console.log("=== STARTED ===");
})