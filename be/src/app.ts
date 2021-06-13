import express from "express";
import { authRouter, baseRouter } from "./router";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use("/", baseRouter);

app.use("/auth", authRouter);

// `auth/social/kakao?code=${query.get('code')
app.listen(8081, () => {
  console.log("8081 port listening");
});
