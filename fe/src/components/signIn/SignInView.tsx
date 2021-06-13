import * as React from 'react';
import styled from 'styled-components';
import SignInForm from './SignInForm';

const SignInView = () => {
  return (
    <SignInViewWrapper>
      <SignInForm handleSubmit={() => {}}></SignInForm>
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
