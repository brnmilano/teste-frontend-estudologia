import { Box } from "@mui/material";
import { memo } from "react";
import { ControlledTextField } from "@/components/Textarea";
import { Button } from "@/components/Button";
import {
  QuestionAnswerSchema,
  QuestionAnswerValidationSchema,
} from "@/models/questionAnswerSchema";
import { useCommon } from "@/hooks/useCommon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuestions } from "@/hooks/useQuestions";
import PencilIconSvg from "@/Icons/PencilIcon";
import toast from "react-hot-toast";
import Image from "next/image";
import TimerIcon from "../../../../public/timer.svg";
import PreviousArrowIcon from "@/Icons/PreviousArrowIcon";
import NextArrowIcon from "@/Icons/NextArrowIcon";
import styles from "./styles.module.scss";

interface QuestionByStepProps {
  id: number;
}

function QuestionsByStep({ id }: Readonly<QuestionByStepProps>) {
  const { questionBook, setQuestionBook, step, setStep } = useQuestions();
  const { minutes, seconds, setOpenModal } = useCommon();

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
  );
}

export default memo(QuestionsByStep);
