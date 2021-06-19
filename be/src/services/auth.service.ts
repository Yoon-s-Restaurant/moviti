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

  async registerUser(name: string, email: string, password: string) {
    const hashedPassword = await this.getHashedPassword(password);
    await this.authRepository.createUser(name, email, hashedPassword);
  }

  async checkDupeUser(email: string): Promise<boolean> {
    const joinedEmail = (await this.authRepository.findByEmail(email))?.email;
    return joinedEmail !== undefined;
  }
}

export default AuthServiceImpl;
