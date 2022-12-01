import { memo, MouseEvent } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
};

const ButtonComponent = ({
  children,
  className = '',
  type = 'button',
  onClick,
}: Props) => (
  <button className={className} type={type} onClick={onClick}>
    {children}
  </button>
);

export const Button = memo(ButtonComponent);
