import * as React from 'react';
import styled, { css } from 'styled-components';
import buttonColorMap from '../../../styles/buttonColorMap';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary';
  unit: 'px' | 'em' | 'rem';
  height?: number;
  children: React.ReactNode;
}
const Button = ({ height, color, children, ...rest }: ButtonProps) => {
  return (
    <ButtonBlock height={height} color={color} {...rest}>
      {children}
    </ButtonBlock>
  );
};

export default Button;

const ButtonBlock = styled.button<ButtonProps>`
  width: 100%;
  ${(props) =>
    props.height &&
    props.unit &&
    css`
      height: ${props.height}${props.unit};
    `}
  border-radius: 40px;
  border: none;
  padding: 5px 18px 6px;
  line-height: 21px;

  ${(props) =>
    props.color &&
    css`
      background-color: ${buttonColorMap[props.color].backgroundColor};
      color: ${buttonColorMap[props.color].color};
    `}
`;
