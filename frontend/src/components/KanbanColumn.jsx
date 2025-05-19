import React from "react";
import CandidateCard from "./CandidateCard";
import styles from "../styles/KanbanColumn.module.css";

const KanbanColumn = ({ title, candidates }) => {
  const getTitleClass = (title) => {
    switch (title) {
      case "Applying Period":
        return styles.applyingPeriodTitle;
      case "Screening":
        return styles.screeningTitle;
      case "Interview":
        return styles.interviewTitle;
      case "Test":
        return styles.testTitle;
      default:
        return styles.title;
    }
  };

  const handleDetailsClick = () => {
    alert(`Details for ${title} column clicked!`);
  };

  return (
    <div className={styles.column}>
      <div className={styles.titleWrapper}>
        <h2 className={`${styles.title} ${getTitleClass(title)}`}>{title}</h2>
        <button className={styles.detailsButton} onClick={handleDetailsClick}>
          Details
        </button>
      </div>
      <div className={styles.cards}>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))
        ) : (
          <p>No candidates in this stage.</p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;