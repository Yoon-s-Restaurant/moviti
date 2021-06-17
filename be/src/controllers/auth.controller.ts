import express from "express";
import dotenv from "dotenv";
import AuthServiceImpl from "../services/auth.service";
import { AuthService } from "../services/interface/AuthService";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { AuthRepository } from "../repos/auth.repository";

dotenv.config();
const router = express.Router();
router.get("/social/kakao", async (req, res) => {
  const authServiceInstance: AuthService = Container.get(AuthServiceImpl);
  const { code } = req.query;
  try {
    const data = await authServiceInstance.getToken(code as string);
    const user = await authServiceInstance.getUser(data["access_token"]);
    console.log(user);
  } catch (e) {
    console.error(e);
  }
});

createConnection({
  type: "mysql",
  host: ,
  port: 3306,
  username: "admin",
  password: ,
  database: "moviti",
  synchronize: false,
  entities: ["src/models/*.ts"],
  logging: false,
})
  .then((connection) => {
    connection.getCustomRepository(AuthRepository);
    router.post("/register", async (req, res) => {
      const authServiceInstance: AuthService = Container.get(AuthServiceImpl);

      //eslint-disable-next-line prefer-const
      let { name, email, password } = req.body;

      if (name === "" || email === "" || password === "") {
        return res.status(400).json({ message: "정보를 입력하세요!" });
      }
      try {
        await authServiceInstance.getHashedPassword(name, email, password);
      } catch (e) {
        res.status(400).json({ message: "회원가입에 실패했습니다!" + e });
      }
    });
  })
  .catch((e) => {
    console.log(e);
  });
export default router;
