import * as React from 'react';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';

const KaKaoRedirect = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  console.log('hihihihi');

  useEffect(() => {
    let isCancelled = false;
    (async () => {
      const response = await axios.get(
        `http:localhost:8081/auth/social/kakao?code=${query.get('code')}`
      );

      if (!isCancelled) {
        console.log(response.data);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);
  return <div>잠시만 기다려주세요...</div>;
};

export default KaKaoRedirect;
