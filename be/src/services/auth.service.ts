import axios from "axios";
import querystring from "querystring";
import { AuthService } from "./interface/AuthService";
import { Service } from "typedi";
import UrlEnum from "../utils/url.enum";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repos/auth.repository";
import { getCustomRepository } from "typeorm";

const saltRounds = 10;

@Service()
class AuthServiceImpl implements AuthService {
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

  async getHashedPassword(name: string, email: string, password: string) {
    const authRepository: AuthRepository = getCustomRepository(AuthRepository);

    bcrypt.genSalt(saltRounds, async (err, salt) => {
      if (err) {
        return {
          register: false,
          message: "비밀번호 암호화에 실패했습니다.",
        };
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return {
            register: false,
            message: "비밀번호 암호화에 실패했습니다.",
          };
        }

        password = hash;

        console.log(name, email, password);
        await authRepository.createUser(name, email, password);
      });
    });
  }
}

export default AuthServiceImpl;
