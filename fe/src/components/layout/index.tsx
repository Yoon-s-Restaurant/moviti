import * as React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  header: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
}
const Layout = ({ header, main, footer }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <HeaderBlock>{header}</HeaderBlock>
      <MainBlock>{main}</MainBlock>
      {footer && <footer>{{ footer }}</footer>}
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;
const HeaderBlock = styled.header`
  background-color: #1e1f21;
  position: fixed;
  height: 68px;
  width: 100%;
  z-index: 100;
`;

const MainBlock = styled.main`
  flex: 1 1 auto;
`;
