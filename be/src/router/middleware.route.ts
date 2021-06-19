import jsonWebToken, { Jwt } from "jsonwebtoken";
import dotenv from "dotenv";
import ResEnum from "../utils/res.enum";
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET as string;

export const verifyToken = (
  req: {
    decode: any;
    headers: { authorization: string };
  },
  res: any,
  next: () => any
) => {
  try {
    req.decode = jsonWebToken.verify(req.headers.authorization, jwtSecretKey);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        message: ResEnum.RES_TOKEN_EXPIRED,
      });
    }
    return res.status(401).json({
      message: ResEnum.RES_FAIL,
    });
  }
};
