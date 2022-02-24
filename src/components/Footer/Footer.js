import styles from './Footer.module.css';

export default function Footer({builder, link}) {
  return (
    <footer className={styles.footer}>
      <p className={styles.p}>
        Built by:&nbsp;
        <a
          href={link}
          rel='noopener noreferrer'
          target='_blank'
          className={styles.a}
        >
          {builder}
        </a>
      </p>
    </footer>
  );
};
