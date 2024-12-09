import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./styles.module.scss";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs
        classes={{
          root: styles.tabsRoot,
          indicator: styles.indicator,
          flexContainer: styles.flexContainer,
        }}
        value={activeTab}
        onChange={handleChange}
      >
        {tabs.map((tab, index) => (
          <Tab
            classes={{
              root: styles.buttonTabRoot,
              selected: styles.selectedTab,
            }}
            key={index}
            label={tab.label}
          />
        ))}
      </Tabs>

      <Box mt={2}>{tabs[activeTab]?.content}</Box>
    </Box>
  );
};

export default CustomTabs;
