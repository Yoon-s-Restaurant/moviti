import * as React from 'react';
import styled from 'styled-components';
import SignUpForm from './SignUpForm';

const SignUpView = () => {
  return (
    <SignUpViewWrapper>
      <SignUpForm handleSubmit={() => {}}></SignUpForm>
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
