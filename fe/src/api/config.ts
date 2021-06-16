import axios from 'axios';
import { QueryClient } from 'react-query';

const movitiApi = axios.create({
  baseURL: `http://localhost:8081/`,
});

const queryClient = new QueryClient();

// const { token } = queryClient.getQueryData('');
// movitiApi.defaults.headers.common['Authorization'] = token;

export default movitiApi;
