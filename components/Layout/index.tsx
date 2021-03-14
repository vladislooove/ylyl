// Libs
import { FC } from 'react';
import Head from 'next/head';

// Styles
import styles from './Layout.module.scss';

export const Layout: FC = ({ children }) => (
  <>
    <Head>
      <title>You Laugh, You Lose</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
    </Head>
    <div className={styles.layout}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  </>
);

export default Layout;
