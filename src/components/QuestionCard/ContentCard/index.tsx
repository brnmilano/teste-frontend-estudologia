import { Card } from "@mui/material";
import { memo } from "react";
import { Box, CardContent } from "@mui/material";
import { Button } from "@/components/Button";
import { useCommon } from "@/hooks/useCommon";
import { useRouter } from "next/router";
import { QuestionsProps } from "@/types/questions";
import clsx from "clsx";
import styles from "./styles.module.scss";
import Text from "@/components/Text";

function ContentCard({
  icon,
  id,
  questions,
  status,
  title,
}: Readonly<QuestionsProps>) {
  const { loading } = useCommon();

  const router = useRouter();

  const navigationForQuestions = async (id: number) => {
    router.push(`/questoes/${id}`);
  };

  return (
    <Card classes={{ root: styles.cardRoot }}>
      <CardContent className={styles.cardContainer}>
        <Box className={styles.icon}>{icon}</Box>

        <Box className={styles.titleAndStatusWrapper}>
          <Text variant="h1" fontWeight={700} className={styles.title}>
            {title}
          </Text>

          <Box
            className={clsx(
              styles.status,
              status === "Respondido" ? styles.answered : styles.notAnswered
            )}
          >
            <Text
              fontSize={12}
              color={
                status === "Respondido"
                  ? "var(--green-400)"
                  : "var(--orange-400)"
              }
            >
              {status}
            </Text>
          </Box>
        </Box>

        <Box className={styles.questions}>
          <Text fontSize={12} color="var(--gray-400)">
            {questions} <span>questões</span>
          </Text>
        </Box>

        <Button onClick={() => navigationForQuestions(id)} loading={loading}>
          Responder
        </Button>
      </CardContent>
    </Card>
  );
}

export default memo(ContentCard);
