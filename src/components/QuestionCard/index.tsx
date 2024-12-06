import { memo } from "react";
import { questionsCard } from "@/utils/questionsUtils";
import { Box } from "@mui/material";
import ContentCard from "./ContentCard";
import styles from "./styles.module.scss";

function QuestionCard() {
  return (
    <Box className={styles.container}>
      {questionsCard.map((question, index) => (
        <ContentCard
          key={`${question.id}_${index - 1}`}
          id={question.id}
          icon={question.icon}
          questions={question.questions}
          status={question.status}
          title={question.title}
        />
      ))}
    </Box>
  );
}

export default memo(QuestionCard);
