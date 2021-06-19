import { SignUpPayload } from '../components/signUp/types';
import Regex from './regex';
import { SignInPayload } from '../components/signIn/types';

const validateSignUpPayload = ({ name, email, password }: SignUpPayload) => {
  const isValidName = validateName(name);
  const isValidPassword = validatePassword(password);
  return isValidName && isValidPassword;
};

const validateSignInPayload = ({ email, password }: SignInPayload) => {
  const isValidPassword = validatePassword(password);
  return isValidPassword;
};
const validateName = (name: string) => {
  if (name.length > 2) {
    return true;
  } else {
    throw new Error('이름 양식을 확인해주세요');
  }
};

const validateEmail = (email: string) => {
  if (Regex.email.test(email)) {
    return true;
  } else {
    throw new Error('Email 양식을 확인해주세요.');
  }
};

const validatePassword = (password: string) => {
  if (Regex.password.test(password)) {
    return true;
  } else {
    throw new Error('비밀번호 양식을 확인해주세요');
  }
};

export { validateSignInPayload, validateSignUpPayload };
