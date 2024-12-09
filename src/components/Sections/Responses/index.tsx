import { useQuestions } from "@/hooks/useQuestions";
import { Box } from "@mui/material";
import TabsComponent from "@/components/Tabs/CustomTabs";
import Text from "@/components/Text";
import styles from "./styles.module.scss";

export default function Responses() {
  const { questionBook } = useQuestions();

  const firstThreeBooks = questionBook.slice(0, 3);

  const bookTitles = firstThreeBooks.map((book) => book.title);

  const bookResponses = firstThreeBooks.map((book) => {
    return book.questions.map((question) => ({
      question: question.question,
      answer: question.answer,
    }));
  });

  const renderBookResponses = (bookIndex: number) => {
    return bookResponses[bookIndex]?.map((question, index) => (
      <Box
        sx={{
          marginTop: 4,
        }}
        key={`${question.question}_${index}`}
      >
        <Text variant="h1" color="var(--black)" fontSize={20} fontWeight={600}>
          {question.question}
        </Text>

        <Box
          display="flex"
          flexDirection="column"
          marginY={2}
          className={styles.divider}
        >
          <Text color="var(--gray-400)" variant="body1" marginBottom={2.5}>
            Resposta:
          </Text>

          <Text color="var(--gray-400)" variant="body1" marginBottom={4}>
            {question.answer}
          </Text>
        </Box>
      </Box>
    ));
  };

  const tabs = [
    { label: bookTitles[0], content: renderBookResponses(0) },
    { label: bookTitles[1], content: renderBookResponses(1) },
    { label: bookTitles[2], content: renderBookResponses(2) },
  ];

  return (
    <Box>
      <TabsComponent tabs={tabs} />
    </Box>
  );
}
