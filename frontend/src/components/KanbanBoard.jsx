import React, { useState, useEffect } from "react";
import HeaderSection from "./HeaderSection";
import KanbanColumn from "./KanbanColumn";
import CandidateCard from "./CandidateCard";
import RightSidebar from "./RightSidebar";
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
import { FiMenu } from "react-icons/fi";

const KanbanBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [isKanbanDropdownOpen, setIsKanbanDropdownOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [isScoreRangeOpen, setIsScoreRangeOpen] = useState(false);
  const [isReferPopupOpen, setIsReferPopupOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [candidateData, setCandidateData] = useState({
    name: "",
    stage: "Applying Period",
    applicationDate: "",
    overallScore: 0,
    referralStatus: "Not Referred",
    assessmentStatus: "Pending",
  });
  const [candidates, setCandidates] = useState([
    {
      id: "1",
      name: "Marlon Reynolds",
      stage: "Applying Period",
      applicationDate: "2023-Oct-29",
      overallScore: 3.5,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "2",
      name: "Regina Hane",
      stage: "Applying Period",
      applicationDate: "2023-Oct-2",
      overallScore: 2,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "3",
      name: "Curtis Baumbach",
      stage: "Applying Period",
      applicationDate: "2023-Oct-2",
      overallScore: 3,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "4",
      name: "Jamie Andersonh",
      stage: "Applying Period",
      applicationDate: "2023-Oct-2",
      overallScore: 3,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "5",
      name: "Kristi Sipes",
      stage: "Screening",
      applicationDate: "2020-Oct-20",
      overallScore: 3.5,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "6",
      name: "Randy Dibbert",
      stage: "Screening",
      applicationDate: "2020-Oct-18",
      overallScore: 3.5,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "7",
      name: "Jane Anderson",
      stage: "Screening",
      applicationDate: "2020-Oct-18",
      overallScore: 3.5,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "8",
      name: "Shelia Doyle",
      stage: "Screening",
      applicationDate: "2020-Oct-13",
      overallScore: 4.5,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "9",
      name: "Cameron Dickens",
      stage: "Interview",
      applicationDate: "2025-Sep-05",
      overallScore: 4,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "10",
      name: "Merle Vandervort",
      stage: "Interview",
      applicationDate: "2025-Sep-09",
      overallScore: 4,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "11",
      name: "Jasmine Wiza",
      stage: "Interview",
      applicationDate: "2025-Sep-10",
      overallScore: 7.8,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "12",
      name: "Jasmine Wiza",
      stage: "Test",
      applicationDate: "2025-Sep-03",
      overallScore: 4.5,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
    {
      id: "13",
      name: "Jasmine Wiza",
      stage: "Test",
      applicationDate: "2025-Sep-03",
      overallScore: 4.5,
      referralStatus: "Not Referred",
      assessmentStatus: "Pending",
    },
  ]);

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
    { name: "Application Form", icon: <LuAlignHorizontalJustifyStart />, isActive: false },
    { name: "Automation", icon: <MdOutlineSettingsSuggest />, isActive: false },
  ];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/candidates");
        if (!response.ok) throw new Error("Failed to fetch candidates");
        const data = await response.json();
        if (Array.isArray(data)) {
          setCandidates((prev) => [...prev, ...data]);
        }
      } catch (err) {
        console.error("Error fetching candidates:", err.message);
      }
    };
    fetchCandidates();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetch(`http://localhost:5001/api/candidates?search=${query}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Search Error:", err));
  };

  const handleDateRangeChange = (type, value) => {
    const newDateRange = { ...dateRange, [type]: value };
    setDateRange(newDateRange);
    fetch(
      `http://localhost:5001/api/candidates?startDate=${newDateRange.start}&endDate=${newDateRange.end}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Date Range Error:", err));
  };

  const handleScoreRangeChange = (value) => {
    const newScoreRange = [parseInt(value), scoreRange[1]];
    setScoreRange(newScoreRange);
    fetch(
      `http://localhost:5001/api/candidates?minScore=${newScoreRange[0]}&maxScore=${newScoreRange[1]}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Score Range Error:", err));
  };

  const handleReferFilter = async () => {
    setIsReferPopupOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...candidateData,
          overallScore: parseInt(candidateData.overallScore),
        }),
      });
      if (!response.ok) throw new Error("Failed to create candidate");
      const data = await response.json();
      const newCandidate = {
        id: data.id || Date.now().toString(),
        ...candidateData,
        overallScore: parseInt(candidateData.overallScore),
      };
      setCandidates((prev) => [...prev, newCandidate]);
      setIsReferPopupOpen(false);
      setCandidateData({
        name: "",
        stage: "Applying Period",
        applicationDate: "",
        overallScore: 0,
        referralStatus: "Not Referred",
        assessmentStatus: "Pending",
      });
    } catch (err) {
      console.error("Error creating candidate:", err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prev) => ({ ...prev, [name]: value }));
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

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div className={styles.kanbanBoard}>
      <HeaderSection />
      <div className={tabStyles.tabSection}>
        <button className={styles.mobileToggleButton} onClick={toggleRightSidebar}>
          <FiMenu />
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`${tabStyles.tabButton} ${tab.isActive ? tabStyles.activeTab : ""}`}
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
                    onChange={(e) => handleDateRangeChange("start", e.target.value)}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => handleDateRangeChange("end", e.target.value)}
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
      {isReferPopupOpen && (
        <div className={filterStyles.popupOverlay}>
          <div className={filterStyles.popupContent}>
            <h2>Add New Candidate</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={candidateData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Stage:
                <select
                  name="stage"
                  value={candidateData.stage}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Applying Period">Applying Period</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Test">Test</option>
                </select>
              </label>
              <label>
                Application Date:
                <input
                  type="date"
                  name="applicationDate"
                  value={candidateData.applicationDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Overall Score:
                <input
                  type="number"
                  name="overallScore"
                  value={candidateData.overallScore}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  required
                />
              </label>
              <label>
                Referral Status:
                <select
                  name="referralStatus"
                  value={candidateData.referralStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Not Referred">Not Referred</option>
                  <option value="Referred">Referred</option>
                </select>
              </label>
              <label>
                Assessment Status:
                <select
                  name="assessmentStatus"
                  value={candidateData.assessmentStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsReferPopupOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.columns}>
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              candidates={candidates.filter((candidate) => candidate.stage === column.title)}
            />
          ))}
        </div>
        <RightSidebar
          isOpen={isRightSidebarOpen}
          toggleSidebar={toggleRightSidebar}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;