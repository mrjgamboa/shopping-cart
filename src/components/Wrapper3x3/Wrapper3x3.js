import styles from './Wrapper3x3.module.css';

export default function Wrapper({children}) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};
