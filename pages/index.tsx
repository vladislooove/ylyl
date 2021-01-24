// Libs
import { FC } from 'react';
import Link from 'next/link';

// Components
import Button from '../components/Button';

const App: FC = () => (
  <div>
    <h1>You Laugh, You Lose</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed illum laborum id laboriosam quaerat voluptatem nulla velit! Excepturi perferendis mollitia molestiae nemo dignissimos, repudiandae ipsum cum, vitae ducimus quaerat sapiente?
    </p>
    <p>
      <Link href="/play">
        <Button>Play</Button>
      </Link>
    </p>
  </div>
)

export default App
