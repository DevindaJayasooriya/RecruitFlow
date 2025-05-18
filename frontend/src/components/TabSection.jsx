import React from "react";
import styles from "../styles/TabSection.module.css";
import { HiOutlineUsers } from "react-icons/hi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineScore } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { TbActivityHeartbeat } from "react-icons/tb";

const TabSection = () => {
  return (
    <div className={styles.tabSection}>
      <button className={`${styles.tabButton} ${styles.active}`}>
        <HiOutlineUsers className={styles.tabIcon} />
        Candidates
      </button>
      <button className={styles.tabButton}>
        <BsInfoCircle className={styles.tabIcon} />
        Job Info
      </button>
      <button className={styles.tabButton}>
        <AiOutlineCalendar className={styles.tabIcon} />
        Calendar
      </button>
      <button className={styles.tabButton}>
        <MdOutlineScore className={styles.tabIcon} />
        Score Card
      </button>
      <button className={styles.tabButton}>
        <TbActivityHeartbeat className={styles.tabIcon} />
        Activity
      </button>
      <button className={styles.tabButton}>
        <IoDocumentTextOutline className={styles.tabIcon} />
        Application Form
      </button>
      <button className={styles.tabButton}>
        <FiSettings className={styles.tabIcon} />
        Automation
      </button>
    </div>
  );
};

export default TabSection;