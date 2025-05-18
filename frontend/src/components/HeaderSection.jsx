import React from "react";
import styles from "../styles/HeaderSection.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { PiShareFill } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";

const HeaderSection = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button className={styles.backButton}>
          <FaArrowLeft className={styles.arrowIcon} />
        </button>
        <div className={styles.titleContainer}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>
              Research and Development Officer
              <IoIosArrowDown className={styles.titleDropdownIcon} />
            </h1>
            <div className={styles.subTitleSection}>
              <div className={styles.openButton}>
                <span className={styles.openDot}></span>
                Open
              </div>
              <div className={styles.subTitleItem}>
                <CiSearch className={styles.subtitleIcon} />
                Researcher
              </div>
              <div className={styles.subTitleItem}>
                <PiSuitcaseSimpleLight className={styles.subtitleIcon} />
                Onsite
              </div>
              <div className={styles.subTitleItem}>
                <FaUserCircle className={styles.subtitleIcon} />
                Created by
                <img src="/api/placeholder/25/25" alt="Profile" className={styles.avatarImage} />
                <span className={styles.userName}>Devinda</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.navigationControls}>
          <button className={styles.navButton}>
            <IoIosArrowBack className={styles.navIcon} />
          </button>
          <button className={styles.navButton}>
            <IoIosArrowForward className={styles.navIcon} />
          </button>
          <span className={styles.jobCount}>1 of 8</span>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.menuButton}>
            <HiDotsHorizontal className={styles.dotsIcon} />
          </button>
          <button className={styles.actionButton}>
            <PiShareFill className={styles.shareIcon} /> 
            <span className={styles.actionText}>Share & Promote</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;