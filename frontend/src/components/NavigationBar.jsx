import React, { useState } from 'react';
import styles from '../styles/NavigationBar.module.css';
import { FaPlus, FaBars } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Avatar } from '@mui/material';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>tiimi | Recruitment</div>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>
      <ul className={`${styles.navTabs} ${isMenuOpen ? styles.navTabsOpen : ''}`}>
        <li className={styles.navItem}>Jobs <span className={styles.badge}>08</span></li>
        <li className={styles.navItem}>Candidates <span className={styles.badge}>551</span></li>
        <li className={styles.navItem}>Career Site</li>
        {/* Actions moved into mobile menu */}
        <li className={styles.mobileActions}>
          <button className={styles.actionButton}><FaPlus /></button>
          <button className={styles.actionButton}><IoSearch /></button>
          <button className={styles.actionButton}><MdOutlineNotificationsActive /></button>
          <div className={styles.profileIcon}>
            <Avatar src='frontend/src/assets/react.svg' alt="User Profile" />
          </div>
        </li>
      </ul>
      {/* Actions remain in desktop view */}
      <div className={styles.actions}>
        <button className={styles.actionButton}><FaPlus /></button>
        <button className={styles.actionButton}><IoSearch /></button>
        <button className={styles.actionButton}><MdOutlineNotificationsActive /></button>
        <div className={styles.profileIcon}>
          <Avatar src='frontend/src/assets/react.svg' alt="User Profile" />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;