// Libs
import { FC } from 'react';

// Styles
import styles from './Button.module.scss';

export const Button: FC = ({ children, ...props }) => <button className={styles.button} {...props}>{children}</button>;

export default Button;
