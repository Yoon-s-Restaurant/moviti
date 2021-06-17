import "reflect-metadata";
import express from "express";
import authController from "./controllers/auth.controller";
import { baseRouter } from "./router";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", baseRouter);

app.use("/auth", authController);

app.listen(8081, () => {
  console.log("8081 port listening");
});
