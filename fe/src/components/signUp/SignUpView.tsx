import * as React from 'react';
import styled from 'styled-components';
import SignUpForm from './SignUpForm';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { signUpUser } from '../../api/auth';
import { SignUpPayload } from '../../types';

const SignUpView = () => {
  const mutation = useMutation((signUpData: SignUpPayload) =>
    signUpUser(signUpData)
  );

  const handleSignUp = useCallback(
    ({ name, email, password }: SignUpPayload) => {
      mutation.mutate({ name, email, password });
    },
    [mutation]
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleError = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);

  return (
    <SignUpViewWrapper>
      <SignUpForm
        handleSignUp={handleSignUp}
        errorMessage={errorMessage}
        handleError={handleError}
      />
    </SignUpViewWrapper>
  );
};
export default SignUpView;

const SignUpViewWrapper = styled.div`
  height: 100%;
  //padding-top: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
