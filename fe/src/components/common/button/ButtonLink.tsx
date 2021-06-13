import { Link } from 'react-router-dom';
import * as React from 'react';
import styled from 'styled-components';

interface ButtonLinkProps {
  children: React.ReactNode;
  to: string;
}
const ButtonLink = ({ children, to }: ButtonLinkProps) => {
  return (
    <Link to={to}>
      <ButtonLinkWrapper>{children}</ButtonLinkWrapper>
    </Link>
  );
};

export default ButtonLink;

const ButtonLinkWrapper = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  border: none;
  padding: 5px 18px 6px;
  line-height: 21px;
  background-color: #fff;
`;
