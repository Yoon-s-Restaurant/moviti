import express from "express";
import dotenv from "dotenv";
import AuthServiceImpl from "../services/auth.service";
import { AuthService } from "../services/interface/AuthService";
import { Container } from "typedi";

const router = express.Router();

dotenv.config();

router.get("/social/kakao", async (req, res) => {
  const { code } = req.query;
  try {
    const authServiceInstance: AuthService = Container.get(AuthServiceImpl);
    const data = await authServiceInstance.getToken(code as string);
    const user = await authServiceInstance.getUser(data["access_token"]);
    console.log(user);
  } catch (e) {
    console.error(e);
  }
});

export default router;
