// Libs
import { FC } from 'react';

// Styles
import styles from './Button.module.scss';

// Types
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button className={styles.button} {...props}>{children}</button>
);

export default Button;
