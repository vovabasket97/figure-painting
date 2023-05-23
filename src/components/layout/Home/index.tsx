import { FC } from 'react';
import styles from './style.module.scss';
import Header from 'components/Header';

const Home: FC = () => {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.body}>test</div>
    </div>
  );
};

export default Home;
