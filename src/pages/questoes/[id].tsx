import { useQuestions } from "@/hooks/useQuestions";
import { GetServerSideProps } from "next";
import { memo } from "react";
import { Box } from "@mui/material";
import { Button } from "@/components/Button";
import { ControlledTextField } from "@/components/Textarea";
import {
  QuestionAnswerSchema,
  QuestionAnswerValidationSchema,
} from "@/models/questionAnswerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCommon } from "@/hooks/useCommon";
import Image from "next/image";
import NextArrowIcon from "@/Icons/NextArrowIcon";
import PreviousArrowIcon from "@/Icons/PreviousArrowIcon";
import TimerIcon from "../../../public/timer.svg";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";
import PencilIconSvg from "@/Icons/PencilIcon";
import Head from "next/head";
import FinishModal from "./FinishModal";

interface QuestionProps {
  id: number;
}

function Questions({ id }: Readonly<QuestionProps>) {
  const { questionBook, setQuestionBook, step, setStep } = useQuestions();
  const { minutes, seconds, openModal, setOpenModal } = useCommon();

  if (!questionBook) {
    return toast.error("Caderno de questões não encontrado");
  }

  const book = questionBook.find((book) => book.id === id);
  const totalQuestions = book?.questions.length || 0;
  const currentQuestion = book?.questions[step - 1];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionAnswerSchema>({
    resolver: zodResolver(QuestionAnswerValidationSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = async (data: QuestionAnswerSchema) => {
    setQuestionBook((prev) => {
      const updatedQuestions = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            questions: item.questions.map((question, index) => {
              if (index === step - 1) {
                return {
                  ...question,
                  answer: data.answer,
                };
              }

              return question;
            }),
          };
        }

        return item;
      });

      console.log({ updatedQuestions });

      return updatedQuestions;
    });

    handleNextQuestion();

    if (step === totalQuestions) {
      toast.success("Respostas enviadas com sucesso");

      setOpenModal(true);
    }
  };

  const handleNextQuestion = () => {
    if (step < totalQuestions) {
      setStep((prev) => prev + 1);
    }

    reset();
  };

  const handlePreviousQuestion = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }

    reset();
  };

  return (
    <>
      <Head>
        <title>Questões | Estudologia</title>
        <meta property="og:title" content="Home | Estudologia" />
      </Head>

      <FinishModal open={openModal} />

      <Box className={styles.container}>
        <Box className={styles.titleAndTimerWrapper}>
          <Box className={styles.titleAndIconWrapper}>
            <PencilIconSvg />

            <h1>{book?.title}</h1>
          </Box>

          <Box className={styles.timerWrapper}>
            <Image src={TimerIcon} alt="Timer" width={24} height={24} />

            <p>
              {minutes}:{seconds}
            </p>
          </Box>
        </Box>

        <Box className={styles.questionAndAnswerWrapper}>
          {currentQuestion && (
            <Box className={styles.titleAndDescriptionWrapper}>
              <h2>
                Pergunta {step}/{totalQuestions}
              </h2>

              <p>{currentQuestion.question}</p>
            </Box>
          )}
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
          <ControlledTextField
            registerField="answer"
            control={control}
            placeholder="Escreva sua resposta aqui"
            errors={errors}
          />

          <Button type="submit" size="medium">
            {step === totalQuestions
              ? "Enviar resposta e finalizar"
              : "Enviar resposta"}
          </Button>

          <div className={styles.divider} />
        </form>

        <Box className={styles.previousAndNext}>
          <Button
            onClick={handlePreviousQuestion}
            size="medium"
            variant="text"
            disabled={step === 1}
          >
            <PreviousArrowIcon disabled={step === 1} />
            Anterior
          </Button>

          <Button
            onClick={handleNextQuestion}
            size="medium"
            variant="text"
            disabled={step === totalQuestions}
          >
            Próximo
            <NextArrowIcon disabled={step === totalQuestions} />
          </Button>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  return {
    props: {
      id: Number(id),
    },
  };
};

export default memo(Questions);
