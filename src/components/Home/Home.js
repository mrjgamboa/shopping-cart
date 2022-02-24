import styles from './Home.module.css';
import { Link } from 'react-router-dom';

export default function Home({ punchLine }) {
  return (
    <div className={styles.homeDiv}>
      <h2 className={styles.h2}>{punchLine}</h2>
      <Link to='/shop' className={styles.Link}>
        shop now
      </Link>
    </div>
  );
};
