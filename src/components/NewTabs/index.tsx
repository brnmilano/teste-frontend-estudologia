import { Box } from "@mui/material";
import { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import Questions from "../Sections/Questions";
import Responses from "../Sections/Responses";

const TabItem = ({ label, onClick, active }: any) => {
  return (
    <Box className={styles.tabItemContent}>
      <span
        className={clsx(styles.tabLabel, { [styles.active]: active })}
        onClick={onClick}
      >
        {label}
      </span>
    </Box>
  );
};

export default function MyTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [{ label: "Questões" }, { label: "Respostas" }];

  const renderTabContent = () => {
    return (
      <>
        <Box
          className={clsx(
            styles.renderTabContent,
            activeTab === 0 && styles.renderTabContentVisible
          )}
        >
          <Questions />
        </Box>
        <Box
          className={clsx(
            styles.renderTabContent,
            activeTab === 1 && styles.renderTabContentVisible
          )}
        >
          <Responses />
        </Box>
      </>
    );
  };

  return (
    <Box className={styles.tabsContainer}>
      <Box className={styles.tabsHeader}>
        {tabs.map((tab, index) => (
          <TabItem
            key={tab.label}
            label={tab.label}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </Box>

      <Box className={styles.tabsContentPosition}>
        <Box className={styles.tabsContent}>{renderTabContent()}</Box>
      </Box>
    </Box>
  );
}
