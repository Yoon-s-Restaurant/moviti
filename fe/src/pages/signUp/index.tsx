import * as React from 'react';
import Layout from '../../components/layout';
import Header from '../../components/common/header';
import { ButtonLink } from '../../components/common/button';
import { SignUpView } from '../../components/signUp';

const SignUp = () => {
  return (
    <>
      <Layout
        header={
          <Header>
            <ButtonLink to="signin">로그인</ButtonLink>
          </Header>
        }
        main={<SignUpView />}
      />
    </>
  );
};

export default SignUp;
