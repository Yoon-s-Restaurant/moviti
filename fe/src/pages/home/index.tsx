import Header from 'components/common/header';
import * as React from 'react';
import Layout from '../../components/layout';
import { ButtonLink } from '../../components/common/button';
import { HomeView } from '../../components/home';

const Home = () => {
  return (
    <>
      <Layout
        header={
          <Header>
            <ButtonLink to="signin">로그인</ButtonLink>
          </Header>
        }
        main={<HomeView />}
      />
    </>
  );
};

export default Home;
