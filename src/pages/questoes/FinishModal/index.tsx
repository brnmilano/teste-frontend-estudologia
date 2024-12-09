import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import Image from "next/image";
import ModalImage from "../../../../public/congratulations.png";
import styles from "./styles.module.scss";
import { Box } from "@mui/material";
import Text from "@/components/Text";
import TimerIcon from "@/Icons/TimerIcon";

interface FinishModalProps {
  open: boolean;
}

export default function FinishModal({ open }: Readonly<FinishModalProps>) {
  const router = useRouter();

  return (
    <Modal open={open}>
      <Box className={styles.modalContent}>
        <Image src={ModalImage} alt="Parabéns" width={120} height={120} />

        <Text
          variant="h1"
          fontSize={40}
          color="var(--primary)"
          fontWeight={600}
        >
          Agradecemos sua participação!
        </Text>

        <Text color="var(--gray-400)" fontSize={20} fontWeight={400}>
          Respostas enviadas com sucesso
        </Text>

        <Text
          color="var(--gray-400)"
          fontSize={14}
          fontWeight={400}
          marginY={1.5}
        >
          <TimerIcon />
          40 min de prova
        </Text>

        <Button
          onClick={() => {
            router.push("/");
          }}
          variant="contained"
          size="medium"
        >
          Valeu!
        </Button>
      </Box>
    </Modal>
  );
}
