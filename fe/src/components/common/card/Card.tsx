import * as React from 'react';

interface CardProps {
  children: React.ReactNode;
}
const Card = ({ children }: CardProps) => {
  return <article>{children}</article>;
};

export default Card;
