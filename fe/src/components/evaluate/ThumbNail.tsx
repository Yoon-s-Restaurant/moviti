import * as React from 'react';
import styled from 'styled-components';

// interface ThumbNailProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
const ThumbNail = ({
  src = '',
  alt,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <ThumbNailWrapper src={src}>
      <Image {...rest} src={src} alt={alt} />
    </ThumbNailWrapper>
  );
};

export default ThumbNail;

const ThumbNailWrapper = styled.div<{
  src: string;
}>`
  height: 0px;
  background-color: lightgray;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: ${(props) => `url(${props.src})`};
  padding-bottom: 150%;
`;

const Image = styled.img`
  display: none;
`;
