export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  name: string;
}
export interface UserPayload {
  message: string;
  user: UserData;
}
