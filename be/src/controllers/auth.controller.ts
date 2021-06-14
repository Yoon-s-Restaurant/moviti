import express, { query } from "express";
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

    //  user -> 기존에 있나?
    //  없으면 가입 하는 로직, 있으면 그냥 그대로 보내줌.
    //  우리 서버  token, or cookie session 작업.

    // res.json(user);
    console.log(user);
  } catch (e) {
    console.error(e);
  }
});

export default router;
