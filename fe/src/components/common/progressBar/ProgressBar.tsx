import * as React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  totalCount: number;
  currentCount: number;
  animationSpeed: number;
}
const ProgressBar = ({
  totalCount,
  currentCount,
  animationSpeed,
}: ProgressBarProps) => {
  const ratio = currentCount / totalCount;
  return (
    <ProgressBarBlock>
      <Progress animationSpeed={animationSpeed} ratio={ratio} />
    </ProgressBarBlock>
  );
};

export default ProgressBar;

const ProgressBarBlock = styled.div`
  height: 1rem;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #fff;
`;

const Progress = styled.div<{
  ratio: number;
  animationSpeed: number;
}>`
  width: ${(props) => `${props.ratio * 100}%`};
  height: 100%;
  background-color: #fff;
  border-radius: 16px;
  transition: width ${(props) => `${props.animationSpeed}`}ms ease-in-out;
`;
