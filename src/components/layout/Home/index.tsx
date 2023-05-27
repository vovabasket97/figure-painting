import { FC } from 'react';
import styles from './style.module.scss';
import Header from 'components/Header';
import SvgEditor from 'components/SvgEditor';

const Home: FC = () => {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.body}>
        <SvgEditor />
      </div>
    </div>
  );
};

export default Home;
