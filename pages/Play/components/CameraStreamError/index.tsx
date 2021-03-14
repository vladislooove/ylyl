// Libs
import { FC } from 'react';

// Styles
import styles from './CameraStreamError.module.scss';

export const CameraStreamError: FC = () => (
  <div className={styles.alert}>
    Please, allow using the webcam
  </div>
);

export default CameraStreamError;
