import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../logo';
import mediaQuery, { BreakPoint } from '../../../styles/mediaQuery';

interface HeaderProps {
  children?: React.ReactNode;
}
const Header = ({ children }: HeaderProps) => {
  return (
    <HeaderBlock>
      <Link to={'/'}>
        <Logo />
      </Link>
      {children}
    </HeaderBlock>
  );
};

export default Header;

const HeaderBlock = styled.div`
  //background-color: transparent;
  //position: fixed;
  ${mediaQuery(BreakPoint.md)} {
    width: calc(100% - 10px * 2);
    padding: 0 10px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  background-color: #1e1f21;
`;
