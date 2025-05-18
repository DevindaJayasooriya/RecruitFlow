import React from 'react';
import styles from '../styles/KanbanColumn.module.css';

const KanbanColumn = ({ title }) => {
  const getTitleClass = () => {
    switch (title) {
      case 'Applying Period':
        return styles.applyingTitle;
      case 'Screening':
        return styles.screeningTitle;
      case 'Interview':
        return styles.interviewTitle;
      case 'Test':
        return styles.testTitle;
      default:
        return styles.columnTitle;
    }
  };

  return (
    <div className={styles.column}>
      <h2 className={`${styles.columnTitle} ${getTitleClass()}`}>{title}</h2>
    </div>
  );
};

export default KanbanColumn;