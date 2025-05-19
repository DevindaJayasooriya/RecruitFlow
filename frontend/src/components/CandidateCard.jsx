import React from "react";
import styles from "../styles/CandidateCard.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const CandidateCard = ({ candidate }) => {
  const getInitials = (name) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case "Applying Period":
        return "#ff9800"; 
      case "Screening":
        return "#9c27b0"; 
      case "Interview":
        return "#2196f3"; 
      case "Test":
        return "#4caf50"; 
      default:
        return "#757575"; 
    }
  };

  const showReferred = candidate.referralStatus === "Referred";
  const showAddAssessment = !showReferred && candidate.assessmentStatus === "Pending";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div
          className={styles.initialsAvatar}
          style={{ backgroundColor: getStageColor(candidate.stage) }}
        >
          {getInitials(candidate.name)}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{candidate.name}</h3>
          <div className={styles.applicationDate}>
            <AiOutlineCalendar className={styles.icon} />
            <span>Applied at: {candidate.applicationDate}</span>
          </div>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <button className={styles.starButton}>
            <AiFillStar className={styles.starIcon} />
          </button>
          <span>{candidate.overallScore} Overall</span>
        </div>
        {showReferred && <span className={styles.referred}>Referred</span>}
        {showAddAssessment && (
          <button className={styles.addAssessmentButton}>Add Assessment</button>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;