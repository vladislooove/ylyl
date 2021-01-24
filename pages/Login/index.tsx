// Libs
import { ChangeEvent, FC, useState } from 'react';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Styles
import styles from './Login.module.scss';

export const Login: FC = () => {
  const [name, setName] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className={styles.login}>
      <h1>Please, enter your name:</h1>
      <div className={styles.input} >
        <Input value={name} placeholder="Name..." onChange={onChange} />
      </div>
      <Button disabled={!name}>
        OK
      </Button>
    </div>
  );
};

export default Login;
