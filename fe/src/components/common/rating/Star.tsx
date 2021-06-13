import * as React from 'react';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

interface StarProps {
  displayedScore: number;
  idx: number;
}
const Star = ({ displayedScore, idx }: StarProps) => {
  if (displayedScore > idx) {
    if (displayedScore - idx === 0.5) {
      return <StarHalfIcon color="secondary" />;
    } else {
      return <StarIcon color="secondary" />;
    }
  } else {
    return <StarBorderIcon color="secondary" />;
  }
};

export default Star;
