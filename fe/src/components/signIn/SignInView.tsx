import * as React from 'react';
import styled from 'styled-components';
import SignInForm from './SignInForm';
import { ReactComponent as KaKaoLogo } from 'assets/kakao.svg';
import { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchUser, signInUser } from '../../api/auth';
import { Redirect } from 'react-router';
import { SignInPayload } from '../../types';

declare global {
  interface Window {
    Kakao: any;
    fbAsyncInit: any;
  }
}

const SignInView = () => {
  const {
    // isLoading: isUserLoading,
    // isError: isUserError,
    data: userData,
    // error: userError,
    refetch,
  } = useQuery('fetchUser', fetchUser, {
    retry: false,
  });

  // 카카오 로그인 요청
  const handleKakaoLogin = useCallback(async () => {
    const kakao = window.Kakao;
    kakao.init('8ebbe34966c8c4dd663c43d421f56e16');
    if (kakao.isInitialized()) {
      window.Kakao?.Auth.authorize({
        redirectUri: 'http://localhost:8080/auth/kakao/redirect',
      });
    }
  }, []);

  const mutation = useMutation('signIn', {
    mutationFn: (signInData: SignInPayload) => signInUser(signInData),
    onSuccess: ({ data }, __, ___) => {
      localStorage.setItem('token', data.token);
      console.log('success????');
      return refetch();
    },
  });

  const handleSignIn = ({ email, password }: SignInPayload) => {
    mutation.mutate({ email, password });
  };

  if (userData) {
    console.log(userData);
    return <Redirect to={'/evaluate'} />;
  }

  return (
    <SignInViewWrapper>
      <FormWrapper>
        <SignInForm handleSignIn={handleSignIn} />
      </FormWrapper>
      <div onClick={handleKakaoLogin}>
        <KaKaoLogo />
      </div>
    </SignInViewWrapper>
  );
};

export default SignInView;

const SignInViewWrapper = styled.div`
  height: 100%;
  //padding-top: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormWrapper = styled.div`
  margin-bottom: 1.5rem;
`;
