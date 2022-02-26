import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

export default function Header(
  { logoSrc, h1String, cartCount }
) {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerDiv}>
          <div className={styles.imgContainer}>
            <img 
              alt='logo' 
              src={logoSrc}
              className={styles.img}
            />
          </div>
          <h1 className={styles.h1}>{h1String}</h1>
        </div>
        <nav 
          aria-label='main'
          className={styles.headerNav}
        >
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/shop'>Shop</NavLink>
          <NavLink to='/cart'>
            Cart{(cartCount > 0) ? ` (${cartCount})` : null}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
