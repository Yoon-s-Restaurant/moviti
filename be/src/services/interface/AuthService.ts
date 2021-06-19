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
  checkDupeUser: (email: string) => Promise<boolean>;
}
