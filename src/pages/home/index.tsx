import { Box } from "@mui/material";
import { memo } from "react";
import TabsComponent from "@/components/Tabs/CustomTabs";
import styles from "./styles.module.scss";
import Head from "next/head";
import Questions from "@/components/Sections/Questions";
import Responses from "@/components/Sections/Responses";

function Home() {
  const tabs = [
    { label: "Questões", content: <Questions /> },
    { label: "Respostas", content: <Responses /> },
  ];

  return (
    <>
      <Head>
        <title>Home | Estudologia</title>
        <meta property="og:title" content="Home | Estudologia" />
      </Head>

      <Box className={styles.container}>
        <TabsComponent tabs={tabs} />
      </Box>
    </>
  );
}

export default memo(Home);
