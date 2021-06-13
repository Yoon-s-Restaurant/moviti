import express from "express";
import baseRouter from "./router/baseRouter";

const app = express();

app.use("/", baseRouter);

app.listen(8081, () => {
  console.log("8081 port listening");
});
