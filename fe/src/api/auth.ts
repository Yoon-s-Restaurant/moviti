import movitiApi from './config';
import { SignInPayload, SignUpPayload } from '../components/signUp/type';

export const registerUserWithKaKao = async ({ queryKey }: any) => {
  const [_, { authCode }] = queryKey;
  const { data } = await movitiApi.get(`/auth/social/kakao?code=${authCode}`);
  return data;
};

// accessToken 가지고... 유저 정보 가져오기
export const fetchUser = async () => {
  const { data } = await movitiApi.get('user', {
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
  });
  return data;
};
// 로그인?
export const signInUser = ({ email, password }: SignInPayload) =>
  movitiApi.post('/user/signIn', {
    email,
    password,
  });

export const signOutUser = async () => {
  const { data } = await movitiApi.post('/user/signOut');

  return data;
};

export const signUpUser = ({ name, email, password }: SignUpPayload) =>
  movitiApi.post('/user/signUp', {
    name,
    email,
    password,
  });
