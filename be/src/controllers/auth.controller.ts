import express from "express";
import dotenv from "dotenv";
import AuthServiceImpl from "../services/auth.service";
import { AuthService } from "../services/interface/AuthService";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { AuthRepository } from "../repos/auth.repository";
import ResEnum from "../utils/res.enum";
import ReqEnum from "../utils/req.enum";
import { User } from "../models/auth.model";

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
          authServiceInstance.loginUser;
          return res.status(400).json({ message: ResEnum.RES_DUPE_USER });
        }
        await authServiceInstance.registerUser(
          userName,
          userEmail,
          ReqEnum.REQ_TYPE_KAKAO
        );
        return res.status(200).json({ message: ResEnum.RES_REGISTER_OK });
      } catch (e) {
        return res.status(400).json({ message: ResEnum.RES_FAIL });
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
        const login = await authServiceInstance.loginUser(
          email,
          ReqEnum.REQ_TYPE_LOCAL,
          password
        );
        if (!login) {
          return res.status(400).json({ message: ResEnum.RES_NO_USER });
        }
        // const user = await authServiceInstance.findUser(email);
        const user = (await authServiceInstance.findUser(email)) as User;
        return res.status(200).json({
          message: ResEnum.RES_SUCCESS,
          token: await authServiceInstance.generateToken(user),
        });
      } catch (e) {
        res.status(400).json({ message: ResEnum.RES_FAIL + e.message });
      }
    });

    router.get("/user", async (req, res) => {
      try {
        const { name, email } = await authServiceInstance.decodeToken(
          req.header("access-token") as string,
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
