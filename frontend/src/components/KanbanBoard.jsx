import React, { useState } from "react";
import HeaderSection from "./HeaderSection";
import KanbanColumn from "./KanbanColumn";
import styles from "../styles/KanbanBoard.module.css";
import tabStyles from "../styles/TabSection.module.css";
import filterStyles from "../styles/FilterSection.module.css";
import { AiOutlineUsergroupDelete, AiOutlineUserAdd } from "react-icons/ai";
import { PiHandbagSimpleThin } from "react-icons/pi";
import { CiCalendarDate, CiSearch } from "react-icons/ci";
import { MdCreditScore } from "react-icons/md";
import { TbActivity, TbLayoutKanbanFilled } from "react-icons/tb";
import { PiWaveformBold } from "react-icons/pi";
import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { PiCalendarStar } from "react-icons/pi";
import { BiFilterAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { RiSearch2Line } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const KanbanBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [isKanbanDropdownOpen, setIsKanbanDropdownOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [isScoreRangeOpen, setIsScoreRangeOpen] = useState(false);

  const columns = [
    { id: "1", title: "Applying Period" },
    { id: "2", title: "Screening" },
    { id: "3", title: "Interview" },
    { id: "4", title: "Test" },
  ];

  const tabs = [
    { name: "Candidates", icon: <AiOutlineUsergroupDelete />, isActive: true },
    { name: "Job Info", icon: <PiHandbagSimpleThin />, isActive: false },
    { name: "Calendar", icon: <CiCalendarDate />, isActive: false },
    { name: "Score Card", icon: <MdCreditScore />, isActive: false },
    { name: "Activity", icon: <TbActivity />, isActive: false },
    {
      name: "Application Form",
      icon: <LuAlignHorizontalJustifyStart />,
      isActive: false,
    },
    { name: "Automation", icon: <MdOutlineSettingsSuggest />, isActive: false },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetch(`/api/candidates?search=${query}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => console.log("Search Results:", data))
      .catch((err) => console.error("Search Error:", err));
  };

  const handleDateRangeChange = (type, value) => {
    const newDateRange = { ...dateRange, [type]: value };
    setDateRange(newDateRange);
    fetch(
      `/api/candidates?startDate=${newDateRange.start}&endDate=${newDateRange.end}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => console.log("Date Range Results:", data))
      .catch((err) => console.error("Date Range Error:", err));
  };

  const handleScoreRangeChange = (value) => {
    const newScoreRange = [parseInt(value), scoreRange[1]];
    setScoreRange(newScoreRange);
    fetch(
      `/api/candidates?minScore=${newScoreRange[0]}&maxScore=${newScoreRange[1]}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => console.log("Score Range Results:", data))
      .catch((err) => console.error("Score Range Error:", err));
  };

  const handleReferFilter = () => {
    fetch("/api/recruiters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "recruiter", name: "New Recruiter" }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Recruiter Added:", data))
      .catch((err) => console.error("Refer Filter Error:", err));
  };

  const toggleKanbanDropdown = () => {
    setIsKanbanDropdownOpen(!isKanbanDropdownOpen);
  };

  const toggleDateRangeDropdown = () => {
    setIsDateRangeOpen(!isDateRangeOpen);
  };

  const toggleScoreRangeDropdown = () => {
    setIsScoreRangeOpen(!isScoreRangeOpen);
  };

  return (
    <div className={styles.kanbanBoard}>
      <HeaderSection />
      <div className={tabStyles.tabSection}>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`${tabStyles.tabButton} ${
              tab.isActive ? tabStyles.activeTab : ""
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
      <div className={filterStyles.filterSection}>
        <div className={filterStyles.leftControls}>
          <div className={filterStyles.searchBar}>
            <RiSearch2Line className={filterStyles.icon} />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className={filterStyles.dateRangeContainer}>
            <button
              className={filterStyles.dateRangeButton}
              onClick={toggleDateRangeDropdown}
            >
              <CiCalendarDate className={filterStyles.icon} /> Date Range{" "}
              <MdOutlineKeyboardArrowDown className={filterStyles.icon} />
            </button>
            {isDateRangeOpen && (
              <div className={filterStyles.dropdownMenu}>
                <div className={filterStyles.dateRangeInputs}>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      handleDateRangeChange("start", e.target.value)
                    }
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      handleDateRangeChange("end", e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className={filterStyles.scoreRangeContainer}>
            <button
              className={filterStyles.scoreRangeButton}
              onClick={toggleScoreRangeDropdown}
            >
              <PiCalendarStar className={filterStyles.icon} /> Score Range{" "}
              <MdOutlineKeyboardArrowDown className={filterStyles.icon} />
            </button>
            {isScoreRangeOpen && (
              <div className={filterStyles.dropdownMenu}>
                <div className={filterStyles.scoreRangeInputs}>
                  <label>
                    Score: {scoreRange[0]} - {scoreRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scoreRange[0]}
                    onChange={(e) => handleScoreRangeChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          <button className={filterStyles.filterButton}>
            <BiFilterAlt className={filterStyles.icon} /> Advanced Filter
          </button>
        </div>
        <div className={filterStyles.rightControls}>
          <button
            className={filterStyles.referButton}
            onClick={handleReferFilter}
          >
            <AiOutlineUserAdd className={filterStyles.icon} /> Refer People
          </button>
          <button className={filterStyles.settingsButton}>
            <FiSettings className={filterStyles.icon} />
          </button>
          <div className={filterStyles.kanbanButtonContainer}>
            <button
              className={filterStyles.kanbanButton}
              onClick={toggleKanbanDropdown}
            >
              <TbLayoutKanbanFilled className={filterStyles.icon} /> Kanban{" "}
              <MdOutlineKeyboardArrowDown className={filterStyles.icon} />
            </button>
            {isKanbanDropdownOpen && (
              <div className={filterStyles.dropdownMenu}>
                <button>Board View</button>
                <button>List View</button>
                <button>Timeline View</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.columns}>
        {columns.map((column) => (
          <KanbanColumn key={column.id} title={column.title} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
