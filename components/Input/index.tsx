// Libs
import { FC } from 'react';

// Styles
import styles from './Input.module.scss';

export const Input: FC = (props) => <input className={styles.input} {...props} />;

export default Input;
