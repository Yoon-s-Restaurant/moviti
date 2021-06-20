import * as React from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import { Button } from '../common/button';
import { Input } from '../common/input';
import Label from '../common/input/Label';
import { useCallback, useState } from 'react';
import { validateSignInPayload } from '../../utils';
import { SignInPayload } from '../../types';

interface SignInFormProps {
  handleSignIn: ({ email, password }: SignInPayload) => void;
}
const SignInForm = ({ handleSignIn }: SignInFormProps) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      try {
        validateSignInPayload({ email, password });
        handleSignIn({ email, password });
      } catch (e) {
        setErrorMessage(e.message);
      }
    },
    [email, password, handleSignIn]
  );
  return (
    <>
      <SignInFormBlock>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <InputWrapper>
              <Label htmlFor={'email'}>이메일 :</Label>
              <Input
                id={'email'}
                type={'email'}
                serial={'upper'}
                value={email}
                onChange={onChangeEmail}
                placeholder={'이메일 (example@gmail.com)'}
                autoComplete={'off'}
              />
            </InputWrapper>
            <div>
              <Label htmlFor={'password'}>비밀번호:</Label>
              <Input
                id={'password'}
                type={'password'}
                serial={'lower'}
                value={password}
                onChange={onChangePassword}
                placeholder={'비밀번호'}
                autoComplete={'off'}
              />
            </div>
          </FormWrapper>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <Button type={'submit'} color={'primary'} height={48} unit={'px'}>
            로그인
          </Button>
        </form>
      </SignInFormBlock>
    </>
  );
};

export default SignInForm;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 0.5em;
`;
const SignInFormBlock = styled.div`
  width: 30vw;
  min-width: 300px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
`;

const InputWrapper = styled.div`
  border-bottom: 1px solid lightgray;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1.5em;
`;
