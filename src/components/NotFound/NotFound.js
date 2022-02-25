import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import notFoundImg from '../../img/not-found.svg';

export default function NotFound({subject}) {
  const history = useNavigate();

  return (
    <div className={styles.notFoundDiv}>
      <div className={styles.imgContainer}>
        <img 
          alt='not found' 
          src={notFoundImg}
          className={styles.img}
        />
      </div>
      <h2 className={styles.h2}>
        {subject} not found
      </h2>
      <button 
        className={styles.button}
        onClick={() => history(-1)}
      >
        &#8617; go back
      </button>
    </div>
  );  
};
