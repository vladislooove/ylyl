// Libs
import { FC } from 'react';
import Link from 'next/link'

const App: FC = () => (
  <div>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </div>
)

export default App
