// Libs
import { FC } from 'react';

// Styles
import styles from './Loader.module.scss';

export const Loader: FC = () => (
  <div className={styles.loader}><div></div><div></div></div>
);

export default Loader;
