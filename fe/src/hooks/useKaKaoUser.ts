import { useQuery } from 'react-query';
import { registerUserWithKaKao } from '../api/auth';

const useKaKaoUser = (authCode: string) => {
  const { isError, isLoading, data, error } = useQuery(
    ['auth/social/kakao', { authCode: authCode }],
    registerUserWithKaKao
  );
};
