import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThumbNail from './ThumbNail';
import MovieDesc from './MovieDesc';
import { useCallback, useRef, useState } from 'react';
import useDescriptionHover from './hooks/useDescriptionHover';

interface MovieCardProps {
  movie: any;
  scoreMovie: (id: number, score: number) => void;
  checkWatchList: (id: number) => void;
}

const MovieCard = ({ movie, scoreMovie, checkWatchList }: MovieCardProps) => {
  const [hover, setHover, handleMouseOver, handleMouseLeave] =
    useDescriptionHover();

  const [score, setScore] = useState(0);

  const onChangeScore = useCallback(
    (displayedScore) => {
      setScore(displayedScore);
      scoreMovie(movie.id, displayedScore);
    },
    [movie, score]
  );

  const handleWatchList = useCallback(() => {
    checkWatchList(movie.id);
  }, [movie]);

  return (
    <MovieCardArticle
      onMouseOver={handleMouseOver}
      onMouseLeave={() => handleMouseLeave(score)}
    >
      <ThumbNail src={'/mv.jpg'} />
      {hover && (
        <MovieDesc
          movie={movie}
          score={score}
          onChange={onChangeScore}
          handleWatchList={handleWatchList}
          // title={title}
          // description={desc}
          // avatarSrc={avatarSrc}
          // createdAt={createdAt}
          // uploader={uploader}
          // views={views}
        />
      )}
    </MovieCardArticle>
  );
};

export default MovieCard;

const MovieCardArticle = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
`;
