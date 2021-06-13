import * as React from 'react';
import styled from 'styled-components';
import SignInForm from './SignInForm';
import { ReactComponent as KaKaoLogo } from 'assets/kakao.svg';
import { useCallback } from 'react';

declare global {
  interface Window {
    Kakao: any;
    fbAsyncInit: any;
  }
}

const SignInView = () => {
  const handleKakaoLogin = useCallback(async () => {
    const kakao = window.Kakao;
    kakao.init('8ebbe34966c8c4dd663c43d421f56e16');
    if (kakao.isInitialized()) {
      window.Kakao?.Auth.authorize({
        redirectUri: 'http://localhost:8080/auth/kakao/redirect',
      });
    }
  }, []);

  return (
    <SignInViewWrapper>
      <FormWrapper>
        <SignInForm handleSubmit={() => {}}></SignInForm>
      </FormWrapper>
      <div onClick={handleKakaoLogin}>
        <KaKaoLogo></KaKaoLogo>
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
