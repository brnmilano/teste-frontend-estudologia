import { memo, ReactNode, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./styles.module.scss";
import Questions from "../Sections/Questions";
import Responses from "../Sections/Responses";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function TabsComponent() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: styles.tabsRoot,
            indicator: styles.indicator,
            flexContainer: styles.flexContainer,
          }}
        >
          <Tab
            classes={{
              root: styles.buttonTabRoot,
              selected: styles.selectedTab,
            }}
            label="Questões"
          />

          <Tab
            classes={{
              root: styles.buttonTabRoot,
              selected: styles.selectedTab,
            }}
            label="Respostas"
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Questions />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Responses />
      </CustomTabPanel>
    </Box>
  );
}

export default memo(TabsComponent);
