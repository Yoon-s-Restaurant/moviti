import axios from "axios";
import querystring from "querystring";
import { AuthService } from "./interface/AuthService";
import { Service } from "typedi";
import UrlEnum from "../utils/url.enum";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repos/auth.repository";
import { getCustomRepository } from "typeorm";
import ReqEnum from "../utils/req.enum";
import { User } from "../models/auth.model";
import ResEnum from "../utils/res.enum";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET as string;
const saltRounds = 10;

@Service()
class AuthServiceImpl implements AuthService {
  authRepository: AuthRepository = getCustomRepository(AuthRepository);

  async getToken(authCode: string) {
    const { data } = await axios.post(
      UrlEnum.URL_TOKEN,
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: UrlEnum.URL_REDIRECT,
        code: authCode as string,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    return data;
  }

  async getUser(accessToken: string) {
    const { data } = await axios.post(
      UrlEnum.URL_USER,
      {
        property_keys: ["properties.nickname"],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return data;
  }

  async getHashedPassword(password: string) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async registerUser(
    name: string,
    email: string,
    type: string,
    password?: string
  ) {
    if (type === ReqEnum.REQ_TYPE_LOCAL && password !== undefined) {
      const hashedPassword = await this.getHashedPassword(password);
      await this.authRepository.createUser(name, email, type, hashedPassword);
    } else if (type === ReqEnum.REQ_TYPE_KAKAO) {
      await this.authRepository.createUser(name, email, type);
    }
  }

  async checkUser(email: string): Promise<boolean> {
    const joinedEmail = (await this.authRepository.findByEmail(email))?.email;
    return joinedEmail !== undefined;
  }

  async findUser(email: string): Promise<User | string> {
    const registeredUser: User | undefined =
      await this.authRepository.findByEmail(email);
    if (registeredUser !== undefined) {
      return registeredUser;
    } else {
      throw new Error(ResEnum.RES_NO_USER);
    }
  }

  async loginUser(
    email: string,
    type: string,
    password?: string
  ): Promise<string> {
    const user: User | string = (await this.findUser(email)) as User;
    let login = false;

    if (type === ReqEnum.REQ_TYPE_LOCAL && password !== undefined) {
      login = await bcrypt.compare(password, user.password);
    } else if (type === ReqEnum.REQ_TYPE_KAKAO) {
      login = true;
    }
    if (login) {
      return await this.generateToken(user);
    } else {
      throw new Error(ResEnum.RES_NO_USER);
    }
  }

  async generateToken(user: User): Promise<string> {
    const { name, email, type } = user;
    return jwt.sign({ name, email, type }, jwtSecretKey, {
      expiresIn: "1d",
    });
  }

  async decodeToken(token: string, email: string) {
    return jwt.verify(token, jwtSecretKey);
  }
}

export default AuthServiceImpl;
