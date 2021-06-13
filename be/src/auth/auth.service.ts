import axios from "axios";
import querystring from "querystring";
import { AuthService } from "./interface/AuthService";
import { Service } from "typedi";
import AuthRepository from "./auth.repository";
import URL from "../enum/url";

@Service()
class AuthServiceImpl implements AuthService {
  constructor(private authRepository: AuthRepository) {}
  async getToken(authCode: string) {
    const { data } = await axios.post(
      URL.URL_TOKEN,
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: URL.URL_REDIRECT,
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
      URL.URL_USER,
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
}

export default AuthServiceImpl;
