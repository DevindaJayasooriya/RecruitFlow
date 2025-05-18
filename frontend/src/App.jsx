import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import KanbanBoard from './components/KanbanBoard';
import TabSection from './components/TabSection';
import styles from './styles/App.module.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.app}>
      <NavigationBar toggleSidebar={toggleSidebar} />
      <Sidebar className={isSidebarOpen ? styles.sidebarOpen : ''} />
      <KanbanBoard />
    </div>
  );
};

export default App;