import * as React from 'react';
import styled from 'styled-components';
import mediaQuery, { BreakPoint } from '../../styles/mediaQuery';
import MovieCard from './MovieCard';
import { Movie } from './type';

interface EvaluateMovieCardListProps {
  movies: Movie[];
  scoreMovie: (id: number, score: number) => void;
  checkWatchList: (id: number) => void;
}

const EvaluateMovieCardList = ({
  movies,
  scoreMovie,
  checkWatchList,
}: EvaluateMovieCardListProps) => {
  return (
    <MovieCardList>
      {movies.map((movie, idx) => (
        <MovieCardItem key={idx}>
          <MovieCard
            movie={movie}
            scoreMovie={scoreMovie}
            checkWatchList={checkWatchList}
          />
        </MovieCardItem>
      ))}
    </MovieCardList>
  );
};

export default EvaluateMovieCardList;

const MovieCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.75rem;

  ${mediaQuery(BreakPoint.md)} {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.75rem;
  }
  ${mediaQuery(BreakPoint.lg)} {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.75rem;
  }
  ${mediaQuery(BreakPoint.xlg)} {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.75rem;
  }
`;

const MovieCardItem = styled.li`
  width: calc(100% / 2 - 0.75rem * 2);
  padding: 0 0.75rem;
  ${mediaQuery(BreakPoint.md)} {
    width: calc(100% / 3 - 0.75rem * 2);
    padding: 0 0.75rem;
  }
  ${mediaQuery(BreakPoint.lg)} {
    width: calc(100% / 4 - 0.75rem * 2);
    padding: 0 0.75rem;
  }
  ${mediaQuery(BreakPoint.xlg)} {
    width: calc(100% / 5 - 0.75rem * 2);
    padding: 0 0.75rem;
  } ;
`;
