import { useQuestions } from "@/hooks/useQuestions";
import { GetServerSideProps } from "next";
import { memo } from "react";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";
import { useCommon } from "@/hooks/useCommon";
import PencilIconSvg from "@/Icons/PencilIcon";
import { Box } from "@mui/material";
import TimerIcon from "../../../public/timer.svg";
import Image from "next/image";
import { Button } from "@/components/Button";
import NextArrowIcon from "@/Icons/NextArrowIcon";
import PreviousArrowIcon from "@/Icons/PreviousArrowIcon";
import { useForm } from "react-hook-form";
import { ControlledTextField } from "@/components/Textarea";
import {
  QuestionAnswerSchema,
  QuestionAnswerValidationSchema,
} from "@/models/questionAnswerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionBookKey } from "@/types/keys";

interface QuestionProps {
  id: number;
}

function Questions({ id }: Readonly<QuestionProps>) {
  const { questionBook, setQuestionBook } = useQuestions();
  const { minutes, seconds } = useCommon();

  if (!questionBook) {
    return toast.error("Caderno de questões não encontrado");
  }

  const book = questionBook.find((book) => book.id === id);
  const totalQuestions = book?.questions.length;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<QuestionAnswerSchema>({
    resolver: zodResolver(QuestionAnswerValidationSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = async (data: QuestionAnswerSchema) => {
    toast.success("Resposta enviada com sucesso");

    setQuestionBook((prev) => {
      const updatedQuestions = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            answer: data.answer,
          };
        }

        return item;
      });

      console.log({ updatedQuestions });

      return updatedQuestions;
    });
  };

  return (
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
        {book?.questions.map((item) => (
          <Box
            key={item.questionNumber}
            className={styles.titleAndDescriptionWrapper}
          >
            <h2>
              Título da pergunta {item.questionNumber}/{totalQuestions}
            </h2>
            <p>{item.question}</p>
          </Box>
        ))}
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <ControlledTextField
          registerField="answer"
          control={control}
          placeholder="Escreva sua resposta aqui"
          errors={errors}
        />

        <Button type="submit" size="medium">
          Enviar resposta
        </Button>

        <div className={styles.divider} />
      </form>

      <Box className={styles.previousAndNext}>
        <p
          onClick={() => {
            toast.success("Anterior");
          }}
        >
          <PreviousArrowIcon />
          Anterior
        </p>

        <p
          onClick={() => {
            toast.success("Proximo");
          }}
        >
          Proximo
          <NextArrowIcon />
        </p>
      </Box>
    </Box>
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
