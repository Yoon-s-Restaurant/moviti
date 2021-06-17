export interface AuthService {
  getToken: (authCode: string) => Promise<any>;
  getUser: (accessToken: string) => Promise<any>;
  getHashedPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<any>;
  // registerMember:
}
