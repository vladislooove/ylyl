// Libs
import { FC } from 'react';

// Types
import { UserProps } from './types';

// Styles
import styles from './User.module.scss';

export const User: FC<UserProps> = ({
  user,
  current,
}) => {
  return (
    <div className={`${styles.user} ${current ? styles.userCurrent : ''} ${user.isMoving ? styles.userMoving : ''}`}>
      Name: {user.name}
      <div className={styles.userStats}>
        <span>Score:</span>
        <b>{user.scores}</b>
      </div>
    </div>
  )
};

export default User;
