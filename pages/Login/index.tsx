// Libs
import { ChangeEvent, FC, useState } from 'react';
import { useRouter } from 'next/router'

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Styles
import styles from './Login.module.scss';

export const Login: FC = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onSubmit = () => {
    router.push({
      pathname: '/play',
      query: { name },
    });
  };

  return (
    <div className={styles.login}>
      <h1>Please, enter your name:</h1>
      <div className={styles.input} >
        <Input value={name} placeholder="Name..." onChange={onChange} />
      </div>
      <Button disabled={!name} onClick={onSubmit}>
        OK
      </Button>
    </div>
  );
};

export default Login;
