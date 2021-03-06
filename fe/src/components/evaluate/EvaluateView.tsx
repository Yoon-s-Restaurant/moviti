import * as React from 'react';
import styled from 'styled-components';
import EvaluateProgressBar from './EvaluateProgressBar';
import EvaluateMovieCardList from './EvaluateMovieCardList';
import mediaQuery, { BreakPoint } from '../../styles/mediaQuery';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchUser, registerUserWithKaKao, signInUser } from '../../api/auth';
import { fetchEvalMovie } from '../../api/movie';
import { UserData } from '../../types';

interface Movie {
  id: number;
  title: string;
}
interface EvaluatedMovie {
  id: number;
  score: number;
}

interface EvaluateViewProps {
  userData: UserData;
}
const EvaluateView = ({ userData }: EvaluateViewProps) => {
  const [selected, setSelected] = useState(0);

  const [movieData, setMovieData] = useState<Movie[]>();

  const [evaluatedMovie, setEvaluatedMovie] = useState<EvaluatedMovie[]>([]);

  const scoreMovie = useCallback(
    (id, score) => {
      setEvaluatedMovie([
        ...evaluatedMovie,
        {
          id,
          score,
        },
      ]);
    },
    [evaluatedMovie]
  );

  const checkWatchList = useCallback((id: number) => {}, []);

  const {
    isLoading: isMoviesLoading,
    isError: isMoviesError,
    data,
    error,
  } = useQuery('movies', fetchEvalMovie);

  if (isMoviesLoading) {
    return <div>Loading...</div>;
  }

  if (isMoviesError) {
    return <span>Error: message</span>;
  }
  return (
    <>
      <ProgressBarSection>
        <ProgressBarWrapper>
          <ProgressBarDescriptionWrapper>
            <ProgressBarCount>{selected}</ProgressBarCount>
          </ProgressBarDescriptionWrapper>
          <EvaluateProgressBar
            animationSpeed={500}
            currentCount={selected}
            totalCount={20}
          />
        </ProgressBarWrapper>
      </ProgressBarSection>
      <GridView>
        <EvaluateMovieCardList
          movies={data!.movie}
          scoreMovie={scoreMovie}
          checkWatchList={checkWatchList}
        />
      </GridView>
    </>
  );
};

export default EvaluateView;

const ProgressBarSection = styled.div`
  position: fixed;
  top: 68px;
  height: 120px;
  width: 100%;
  background: linear-gradient(
    to top,
    rgba(18, 18, 18, 0),
    rgba(18, 18, 18, 0.6) 10%,
    rgba(18, 18, 18, 0.8) 16%,
    rgb(18, 18, 18) 29%
  );
  z-index: 100;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  //background-color: #fff;
`;

const ProgressBarDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  margin-bottom: 1rem;
`;
const ProgressBarCount = styled.p`
  font-size: 1.25rem;
`;
const GridView = styled.div`
  padding: calc(188px + 15px) 25px 15px;

  ${mediaQuery(BreakPoint.lg)} {
    padding: calc(188px + 25px) 50px 25px;
  }
`;
