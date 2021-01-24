// Libs
import { FC } from 'react';
import Link from 'next/link';

// Components
import Button from '../../components/Button';

// Styles
import styles from './Home.module.scss';

const Home: FC = () => (
  <div className={styles.home}>
    <h1>You Laugh, You Lose</h1>
    <p>
      Welcome to YLYL game!
    </p>
    <p>
      Rules are simple - each player posts funny content (text, images or videos) and other players tryes not to laugh. Once player laugh - he lose.
    </p>
    <p>
      Application need to access to your web camera. Do not afraid - your face wont be shown to other players, we need camera just to recognize your emotions while you are playing.
    </p>
    <p>
      <Link href="/play">
        <Button>Letsa go!</Button>
      </Link>
    </p>
  </div>
)

export default Home;

