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
    <div className={`${styles.user} ${current ? styles.userCurrent : ''}`}>
      Name: {user.name}
    </div>
  )
};

export default User;
