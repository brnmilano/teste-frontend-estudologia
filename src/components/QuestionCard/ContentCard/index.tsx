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
import { useQuestions } from "@/hooks/useQuestions";

function ContentCard({
  icon,
  id,
  questions,
  status,
  title,
}: Readonly<QuestionsProps>) {
  const router = useRouter();
  const { questionBook } = useQuestions();

  const navigationForQuestions = async (id: number) => {
    router.push(`/questoes/${id}`);
  };

  const findStatus = questionBook?.find((book) => book.id === id)?.status;

  return (
    <Card classes={{ root: styles.cardRoot }}>
      <CardContent className={styles.cardContainer}>
        <Box className={styles.icon}>{icon}</Box>

        <Box className={styles.titleAndStatusWrapper}>
          <Text variant="h1" fontWeight={700} className={styles.title}>
            {title}
          </Text>

          <Box>
            <Text
              fontSize={12}
              className={clsx(
                styles.status,
                status === findStatus ? styles.notAnswered : styles.answered
              )}
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

        <Button onClick={() => navigationForQuestions(id)}>Responder</Button>
      </CardContent>
    </Card>
  );
}

export default memo(ContentCard);
