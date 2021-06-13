import * as React from 'react';
import ProgressBar from '../common/progressBar/ProgressBar';

interface EvaluateProgressProps {
  totalCount: number;
  currentCount: number;
  animationSpeed: number;
}
const EvaluateProgressBar = ({
  totalCount,
  currentCount,
  animationSpeed,
}: EvaluateProgressProps) => {
  return (
    <ProgressBar
      totalCount={totalCount}
      currentCount={currentCount}
      animationSpeed={animationSpeed}
    />
  );
};

export default EvaluateProgressBar;
