import { memo } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const ButtonComponent = ({
  children,
  className = '',
  type = 'button',
}: Props) => (
  <button className={className} type={type}>
    {children}
  </button>
);

export const Button = memo(ButtonComponent);
