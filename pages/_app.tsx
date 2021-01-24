// Libs
import { FC } from 'react';

// Components
import Layout from '../components/Layout';

// Styles
import '../styles/index.scss';

export const App: FC<any> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;