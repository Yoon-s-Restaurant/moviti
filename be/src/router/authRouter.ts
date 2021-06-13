import express, { query } from "express";
import querystring from "querystring";
import axios from "axios";
const router = express.Router();
import dotenv from "dotenv";

dotenv.config();
// `auth/social/kakao?code=${query.get('code')&page=1
router.get("/social/kakao", async (req, res) => {
  const { code } = req.query;
  console.log(code);

  try {
    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: "http://localhost:8080/auth/kakao/redirect",
        code: code as string,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    const response = await axios.post(
      `https://kapi.kakao.com/v2/user/me`,
      {
        // params: {
        property_keys: ["properties.nickname"],
        // },
        // paramsSerializer: (
        //   params: querystring.ParsedUrlQueryInput | undefined
        // ) => {
        //   return querystring.stringify(params);
        // },
      },
      // querystring.stringify({
      //   property_keys: "[properties.nickname]",
      // }),
      {
        headers: {
          Authorization: `Bearer ${data["access_token"]}`,
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    console.log(response);
  } catch (e) {
    console.error(e);
  }
});

export default router;
