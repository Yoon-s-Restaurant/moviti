import { Movie } from '../components/evaluate/type';

export const fetchEvalMovie = async () => {
  const foo = () =>
    new Promise<{ movie: Movie[] }>((res, rej) => {
      if (false) rej('hihi');
      setTimeout(() => {
        res({
          movie: [
            {
              id: 1,
              title: 'hi',
              src: '/mv.jpg',
            },
            {
              id: 2,
              title: 'hello',
              src: '/mv.jpg',
            },
            {
              id: 3,
              title: 'bye',
              src: '/mv.jpg',
            },
            {
              id: 4,
              title: 'hi',
              src: '/mv.jpg',
            },
            {
              id: 5,
              title: 'hello',
              src: '/mv.jpg',
            },
            {
              id: 6,
              title: 'bye',
              src: '/mv.jpg',
            },
          ],
        });
      }, 2000);
    });

  // return foo;
  // const { data } = await movitiApi.get('/eval/movies');

  return await foo();
};
