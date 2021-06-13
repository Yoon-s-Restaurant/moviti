import * as React from 'react';
import Layout from '../../components/layout';
import Header from '../../components/common/header';
import { ButtonLink } from '../../components/common/button';
import SignInView from '../../components/signIn/SignInView';

const SignIn = () => {
  return (
    <>
      <Layout
        header={
          <Header>
            <ButtonLink to="signup">회원가입</ButtonLink>
          </Header>
        }
        main={<SignInView />}
      />
    </>
  );
};

export default SignIn;
