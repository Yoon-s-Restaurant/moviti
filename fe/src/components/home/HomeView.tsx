import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useQuery } from 'react-query';
import { signInUser } from '../../api/auth';

const HomeView = () => {
  return (
    <HomeViewWrapper>
      <TitleWrapper>
        <Title>영화, 드라마, 예능, 다큐 취향 분석</Title>
      </TitleWrapper>
      <DescriptionWrapper>
        <Description>영화 취향따라 알아보는...</Description>
      </DescriptionWrapper>
      <Link to={'/evaluate'}>
        <EvalDesc>
          <EvaluateLink>분석 하러가기</EvaluateLink>
          <AnimationArrow>
            <ArrowForwardIosIcon style={{ fontSize: 'inherit' }} />
          </AnimationArrow>
        </EvalDesc>
      </Link>
    </HomeViewWrapper>
  );
};

export default HomeView;

const HomeViewWrapper = styled.div`
  height: 100%;
  //padding-top: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  color: #fff;
  //font-size: 1.5em;
  margin-bottom: 1em;
`;
const Title = styled.h2`
  font-size: 2rem;
`;

const DescriptionWrapper = styled.div`
  margin-bottom: 1.5em;
`;
const Description = styled.p`
  color: #fff;
  font-size: 1.25rem;
`;

const growAndShrink = keyframes`
  to {
    font-size: 2rem;
  } 
  from {
    font-size: 1rem;
  }
`;

const EvalDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  color: #f82f62;
  font-size: 1.25rem;
  animation: ${growAndShrink} 1s linear infinite;
`;
const EvaluateLink = styled.span``;

const AnimationArrow = styled.span``;
