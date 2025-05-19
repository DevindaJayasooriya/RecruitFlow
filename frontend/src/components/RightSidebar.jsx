import React from "react";
import styles from "../styles/RightSidebar.module.css";
import { FiBell, FiMessageSquare, FiUsers, FiSettings, FiHelpCircle } from "react-icons/fi";
import { FaGoogleDrive } from "react-icons/fa";
import { IoIosCloudDownload } from "react-icons/io";
import { SiNotion } from "react-icons/si";
import { GoFileSubmodule } from "react-icons/go";
import { GrGoogleWallet } from "react-icons/gr";

const RightSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${styles.rightSidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isOpen ? "×" : "☰"}
        </button>
      </div>
      <div className={styles.iconList}>
        <button className={styles.iconButton}>
          <FaGoogleDrive className={styles.icon} />
        </button>
        <button className={styles.iconButton}>
          <IoIosCloudDownload className={styles.icon} />
        </button>
        <button className={styles.iconButton}>
          <SiNotion className={styles.icon} />
        </button>
        <button className={styles.iconButton}>
          <GoFileSubmodule className={styles.icon} />
        </button>
        <button className={styles.iconButton}>
          <GrGoogleWallet className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;