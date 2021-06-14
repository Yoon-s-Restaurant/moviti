import "reflect-metadata";
import express from "express";
import authController from "./controllers/auth.controller";
import { baseRouter } from "./router";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use("/", baseRouter);

app.use("/auth", authController);

app.listen(8081, () => {
  console.log("8081 port listening");
});
