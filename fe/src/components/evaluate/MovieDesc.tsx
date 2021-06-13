import * as React from 'react';
import styled from 'styled-components';
import { Rating } from '../common/rating';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
interface MovieDescProps {
  score: number;
  onChange: (displayedScore: number) => void;
  handleWatchList: () => void;
  movie: any;
}

const MovieDesc = ({
  movie,
  score,
  onChange,
  handleWatchList,
}: MovieDescProps) => {
  return (
    <DescriptionWrapper>
      <MovieTitle>gg</MovieTitle>
      <Rating numberOfStar={5} onChange={onChange} score={score} />
      <DescriptionFooter>
        <FooterArea>
          <AddButton onClick={handleWatchList}>
            <AddIcon />
            보고싶어요
          </AddButton>
        </FooterArea>
        <FooterArea>
          <Link to={`/movie/${movie.id}`}>상세보기</Link>
        </FooterArea>
      </DescriptionFooter>
    </DescriptionWrapper>
  );
};

export default MovieDesc;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background-color: rgba(18, 17, 24, 0.9);
`;

const MovieTitle = styled.h3`
  color: #fff;
`;

const AddButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const FooterArea = styled.div`
  flex: 1 1 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
