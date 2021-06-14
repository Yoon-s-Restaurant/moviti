export interface AuthService {
  getToken: (authCode: string) => Promise<any>;
  getUser: (accessToken: string) => Promise<any>;
}
