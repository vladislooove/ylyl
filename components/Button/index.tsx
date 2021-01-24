import { FC } from 'react';

export const Button: FC = ({ children, ...props }) => <button {...props}>{children}</button>;

export default Button;
