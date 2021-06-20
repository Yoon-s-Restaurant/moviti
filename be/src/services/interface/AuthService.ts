import { User } from "../../models/auth.model";

export interface AuthService {
  getToken: (authCode: string) => Promise<any>;
  getUser: (accessToken: string) => Promise<any>;
  getHashedPassword: (password: string) => Promise<string>;
  registerUser: (
    name: string,
    email: string,
    type: string,
    password?: string
  ) => Promise<any>;
  checkUser: (email: string) => Promise<boolean>;
  findUser: (email: string) => Promise<User | string>;
  loginUser: (email: string, type: string, password?: string) => Promise<any>;
  generateToken: (user: User, expireIn: string) => Promise<string>;
  decodeToken: (token: string, email: string) => Promise<any>;
  generateRefreshToken: (user: User) => Promise<any>;
}
