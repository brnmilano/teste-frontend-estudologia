import TabsComponent from "@/components/Tabs";
import { Box } from "@mui/material";
import { memo } from "react";
import styles from "./styles.module.scss";

function Home() {
  return (
    <Box className={styles.container}>
      <TabsComponent />
    </Box>
  );
}

export default memo(Home);
