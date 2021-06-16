import * as React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { registerUserWithKaKao } from '../../api/auth';

const KaKaoRedirect = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  // 인가코드 -> 사용자 정보 받기 ( accessToken )
  const { isError, isLoading, data, error } = useQuery(
    ['auth/social/kakao', { authCode: query.get('code') as string }],
    registerUserWithKaKao
  );

  const history = useHistory();

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.token);
      history.replace('/evaluate');
    }
  }, [data]);
  return <div>잠시만 기다려주세요...</div>;
};

export default KaKaoRedirect;
