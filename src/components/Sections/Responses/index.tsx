import Text from "@/components/Text";
import { useQuestions } from "@/hooks/useQuestions";
import { Box, Divider } from "@mui/material";
import styles from "./styles.module.scss";
import MyTabs from "@/components/NewTabs";
import { contentBookOfQuestions } from "@/utils/questionsLists";
import PencilIconSvg from "@/Icons/PencilIcon";

export default function Responses() {
  const { questionBook } = useQuestions();

  const questionBookFindById = questionBook.find((item) => item.id === 1);

  console.log(questionBookFindById);

  const renderBooksTitle = () => {
    return contentBookOfQuestions.map((book, index) => (
      <Box className={styles.bookTitles} key={`${book.id}_${index}`}>
        <Text
          variant="h1"
          color="var(--primary)"
          fontSize={18}
          fontWeight={700}
        >
          <PencilIconSvg color="var(--primary)" />

          {book.title}
        </Text>
      </Box>
    ));
  };

  const findBookQuestions = contentBookOfQuestions.find(
    (book) => book.id === 1
  );

  const rendeQuestions = () => {
    return findBookQuestions?.questions.map((question) => (
      <Box key={question.questionNumber}>
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

  return (
    <Box className={styles.container}>
      <Box>{renderBooksTitle()}</Box>

      {rendeQuestions()}

      {/* <Box>
        {questionBookFindById?.questions.map((question) => (
          <Box key={question.questionNumber}>
            <Text
              variant="h1"
              color="var(--black)"
              fontSize={20}
              fontWeight={600}
            >
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
        ))}
      </Box> */}
    </Box>
  );
}
