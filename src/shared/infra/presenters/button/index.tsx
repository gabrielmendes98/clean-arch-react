type Props = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({
  children,
  className = '',
  type = 'button',
}: Props) => (
  <button className={className} type={type}>
    {children}
  </button>
);
