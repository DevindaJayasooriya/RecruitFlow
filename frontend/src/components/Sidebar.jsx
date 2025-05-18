import React from 'react';
import styles from '../styles/Sidebar.module.css';
import { IoHome, IoCalendarNumberOutline } from "react-icons/io5";
import { LuLaptop } from "react-icons/lu";
import { FaRegUserCircle, FaQuestionCircle } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { TbClockCog } from "react-icons/tb";
import { GiCash } from "react-icons/gi";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { TbSettings } from "react-icons/tb";
import { RiQuestionnaireLine } from "react-icons/ri";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContainer}>
        <ul className={styles.sidebarList}>
          <div className={styles.section}>
            <li className={styles.sidebarItem}><IoHome className={styles.icon} /></li>
            <li className={styles.sidebarItem}><IoCalendarNumberOutline className={styles.icon} /></li>
            <li className={styles.sidebarItem}><LuLaptop className={styles.icon} /></li>
            <li className={styles.sidebarItem}><FaRegUserCircle className={styles.icon} /></li>
          </div>
          <div className={styles.divider}></div>

          <div className={styles.section}>
            <li className={styles.sidebarItem}><GrUserManager className={styles.icon} /></li>
            <li className={styles.sidebarItem}><TbClockCog className={styles.icon} /></li>
          </div>
          <div className={styles.divider}></div>

          <div className={styles.section}>
            <li className={styles.sidebarItem}><GiCash className={styles.icon} /></li>
            <li className={styles.sidebarItem}><PiBuildingOfficeBold className={styles.icon} /></li>
            <li className={styles.sidebarItem}><HiOutlineDocumentChartBar className={styles.icon} /></li>
          </div>
        </ul>

        <ul className={styles.bottomSection}>
          <div className={styles.section}>
            <li className={styles.sidebarItem}><TbSettings className={styles.icon} /></li>
            <li className={styles.sidebarItem}><RiQuestionnaireLine className={styles.icon} /></li>
            <li className={styles.sidebarItem}><FaQuestionCircle className={styles.icon} /></li>
          </div>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;