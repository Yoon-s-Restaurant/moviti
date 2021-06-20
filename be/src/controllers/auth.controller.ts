import express from "express";
import dotenv from "dotenv";
import AuthServiceImpl from "../services/auth.service";
import { AuthService } from "../services/interface/AuthService";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { AuthRepository } from "../repos/auth.repository";
import ResEnum from "../utils/res.enum";
import ReqEnum from "../utils/req.enum";

dotenv.config();
const router = express.Router();
createConnection()
  .then((connection) => {
    connection.getCustomRepository(AuthRepository);

    router.get("/social/kakao", async (req, res) => {
      const authServiceInstance: AuthService = Container.get(AuthServiceImpl);
      const { code } = req.query;
      try {
        const data = await authServiceInstance.getToken(code as string);
        const user = await authServiceInstance.getUser(data["access_token"]);
        const userEmail = user.kakao_account.email;
        const userName = user.kakao_account.profile.nickname;
        console.log(user);
        if (await authServiceInstance.checkUser(userEmail)) {
          const loginToken = await authServiceInstance.loginUser(
            userEmail,
            ReqEnum.REQ_TYPE_KAKAO
          );
          console.log(loginToken);
          return res.status(200).json({
            message: ResEnum.RES_SUCCESS,
            token: loginToken,
          });
        }
        await authServiceInstance.registerUser(
          userName,
          userEmail,
          ReqEnum.REQ_TYPE_KAKAO
        );
        return res.status(200).json({ message: ResEnum.RES_REGISTER_OK });
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    });

    const authServiceInstance: AuthService = Container.get(AuthServiceImpl);
    router.post("/register", async (req, res) => {
      //eslint-disable-next-line prefer-const
      let { name, email, password } = req.body;
      try {
        if (name === "" || email === "" || password === "") {
          return res.status(400).json({ message: ResEnum.RES_NO_DATA });
        }
        if (await authServiceInstance.checkUser(email)) {
          return res.status(400).json({ message: ResEnum.RES_DUPE_USER });
        }
        await authServiceInstance.registerUser(
          name,
          email,
          ReqEnum.REQ_TYPE_LOCAL,
          password
        );
        return res.status(200).json({ message: ResEnum.RES_REGISTER_OK });
      } catch (e) {
        res.status(400).json({ message: ResEnum.RES_FAIL + e.message });
      }
    });

    router.post("/login", async (req, res) => {
      const { email, password } = req.body;
      try {
        const loginToken = await authServiceInstance.loginUser(
          email,
          ReqEnum.REQ_TYPE_LOCAL,
          password
        );
        return res.status(200).json({
          message: ResEnum.RES_SUCCESS,
          token: loginToken,
        });
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    });

    router.get("/user", async (req, res) => {
      try {
        const { name, email } = await authServiceInstance.decodeToken(
          req.header("Authorization") as string,
          req.body.email
        );
        return res
          .status(200)
          .json({ message: ResEnum.RES_SUCCESS, user: { name, email } });
      } catch (e) {
        return res.status(400).json({ message: ResEnum.RES_FAIL });
      }
    });
  })
  .catch((e) => {
    console.log(e);
  });
export default router;
