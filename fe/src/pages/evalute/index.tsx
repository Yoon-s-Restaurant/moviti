import * as React from 'react';
import Layout from '../../components/layout';
import Header from '../../components/common/header';
import { EvaluateView } from '../../components/evaluate';

const Evaluate = () => {
  return (
    <>
      <Layout header={<Header />} main={<EvaluateView />} />
    </>
  );
};

export default Evaluate;
