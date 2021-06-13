import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Star from './Star';

interface RatingProps {
  numberOfStar: number;
  score: number;
  onChange: (num: number) => void;
}
const Rating = ({ numberOfStar, score, onChange }: RatingProps) => {
  const [displayedScore, setDisplayedScore] = useState(score);

  const calculateScore = (e: React.MouseEvent) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - left;
    const scale = width / numberOfStar / 2;
    const score = Math.floor(xPos / scale + 1) / 2;
    return score;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    const s = calculateScore(e);
    setDisplayedScore(calculateScore(e));
  };

  const handleMouseLeave = () => {
    setDisplayedScore(displayedScore);
  };
  const handleClick = (e: React.MouseEvent) => {
    console.log(';;');
    e.stopPropagation();
    onChange(displayedScore);
  };
  return (
    <RatingSection>
      <RatingContainer
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {Array(numberOfStar)
          .fill(0)
          .map((item, idx) => (
            // <StarWrapper >
            <Star key={idx} displayedScore={displayedScore} idx={idx} />
            // </StarWrapper>
          ))}
      </RatingContainer>
    </RatingSection>
  );
};

export default Rating;

const RatingSection = styled.section`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;
const RatingContainer = styled.div``;
