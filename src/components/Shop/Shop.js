import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Shop.module.css';
import hero from '../../img/hero.png';
import { products } from '../../data/products';

export default function Shop(params) {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => showNav ? setShowNav(false) : setShowNav(true);

  return (
    <div className={styles.shopDiv}>
      <div className={styles.heroContainer}>
        <img 
          alt='hero'
          src={hero}
          className={styles.hero}
        />
      </div>
      <div className={styles.filterContainer}>
        <button 
          className={styles.filterButton}
          onClick={toggleNav}
        >
          filter {showNav ? '\u274C' : '\u2795'}
        </button>
        {showNav &&
          <nav
            className={styles.shopNav}
            aria-label='secondary'
          >
            <div className={styles.wrapper}>
              <NavLink to='all'>All</NavLink>
              <NavLink to='art-prints'>Art Prints</NavLink>
              <NavLink to='stickers'>Stickers</NavLink>
              <NavLink to='mugs'>Mugs</NavLink>
              <NavLink to='mouse-pads'>Mouse Pads</NavLink>
            </div>
          </nav>
        }
      </div>
      <Outlet />
    </div>
  );
};
