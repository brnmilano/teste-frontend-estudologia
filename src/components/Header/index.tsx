import { useRouter } from "next/router";
import { memo } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import NotificationIcon from "../../../public/notification.svg";
import MessageIcon from "../../../public/message.svg";
import SearchIcon from "../../../public/search.svg";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";

function Header() {
  const router = useRouter();

  const featureUnderDevelopment = () => {
    toast.error("Recurso em desenvolvimento");
  };

  return (
    <>
      {router.pathname === "/home" && (
        <header className={styles.headerHomeContainer}>
          <Box className={styles.iconsWrapper}>
            <Box onClick={featureUnderDevelopment}>
              <Image src={NotificationIcon} alt="Logo" width={24} height={24} />
            </Box>

            <Box onClick={featureUnderDevelopment}>
              <Image src={MessageIcon} alt="Logo" width={24} height={24} />
            </Box>

            <Box
              className={styles.searchWrapper}
              onClick={featureUnderDevelopment}
            >
              <Image src={SearchIcon} alt="Logo" width={22} height={22} />

              <p>Procurar</p>
            </Box>
          </Box>
        </header>
      )}

      {router.pathname === "/questoes" && (
        <header className={styles.headerNotHomeContainer}>
          <Image src={Logo} alt="Logo" width={107} height={18} />
        </header>
      )}
    </>
  );
}

export default memo(Header);
