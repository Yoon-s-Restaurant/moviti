import { SignUpPayload } from '../components/signUp/type';

export default ({ name, email, password }: SignUpPayload) => {
  const isValidName = validateName(name);
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

  return isValidName && isValidEmail && isValidPassword;
};

const validateName = (name: string) => {
  return true;
};

const validateEmail = (email: string) => {
  return true;
};

const validatePassword = (password: string) => {
  return true;
};
