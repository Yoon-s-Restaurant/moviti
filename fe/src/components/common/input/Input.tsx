import * as React from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  round?: boolean;
  serial?: 'upper' | 'middle' | 'lower';
}

const Input = ({ round = true, serial, ...rest }: InputProps) => {
  return <InputComponent round={round} serial={serial} {...rest} />;
};

export default Input;

const InputComponent = styled.input<InputProps>`
  width: calc(100% - 10px * 2 - 1px * 2);
  ${(props) =>
    props.round &&
    css`
      border-radius: 8px;
    `}
  ${(props) => {
    if (props.serial) {
      if (props.serial === 'upper') {
        return css`
          border-radius: 4px 4px 0px 0px;
          border-width: 1px 1px 0px;
        `;
      } else if (props.serial === 'middle') {
        return css`
          border-radius: 0;
          border-width: 0 1px 0;
        `;
      } else {
        return css`
          border-radius: 0px 0px 4px 4px;
          border-width: 0px 1px 1px;
        `;
      }
    }
  }}
  font-size: 16px;
  padding: 10px 10px 10px 10px;
  border-color: rgba(154, 151, 161, 0.2);
`;
