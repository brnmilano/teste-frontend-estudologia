import TabsComponent from "@/components/Tabs";
import { Box } from "@mui/material";
import { memo } from "react";
import styles from "./styles.module.scss";
import Head from "next/head";
import Modal from "@/components/Modal";
import { useCommon } from "@/hooks/useCommon";
import { Button } from "@/components/Button";

function Home() {
  const { openModal, setOpenModal } = useCommon();

  return (
    <>
      <Head>
        <title>Home | Estudologia</title>
        <meta property="og:title" content="Home | Estudologia" />
      </Head>

      <Box className={styles.container}>
        <TabsComponent />
      </Box>
    </>
  );
}

export default memo(Home);
