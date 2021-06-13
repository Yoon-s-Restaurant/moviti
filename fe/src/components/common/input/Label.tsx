import * as React from 'react';
import styled, { css } from 'styled-components';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  blind?: boolean;
}
const Label = ({ blind = true, children, ...rest }: LabelProps) => {
  return (
    <LabelComponent blind={blind} {...rest}>
      {children}
    </LabelComponent>
  );
};

export default Label;

const LabelComponent = styled.label<LabelProps>`
  ${(props) =>
    props.blind &&
    css`
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
    `}
`;
