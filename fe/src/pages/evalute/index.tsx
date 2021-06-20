import * as React from 'react';
import Layout from '../../components/layout';
import Header from '../../components/common/header';
import { EvaluateView } from '../../components/evaluate';
import { useQuery } from 'react-query';
import { fetchUser } from '../../api/auth';
import UserProfile from '../../components/common/header/UserProfile';

const Evaluate = () => {
  const {
    isLoading: isUserLoading,
    isError: isUserError,
    data: userData,
    error: userError,
  } = useQuery('fetchUser', fetchUser);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError) {
    return <span>Error: message</span>;
  }
  return (
    <>
      <Layout
        header={
          <Header>
            <UserProfile userData={userData!.user} />
          </Header>
        }
        main={<EvaluateView userData={userData!.user} />}
      />
    </>
  );
};

export default Evaluate;
