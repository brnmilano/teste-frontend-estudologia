import { useRouter } from "next/router";
import { memo } from "react";
import { questionsCard } from "@/utils/questions-utils";
import { Button } from "../Button";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useCommon } from "@/hooks/useCommon";
import { set } from "react-hook-form";

function Card() {
  const { loading, setLoading } = useCommon();

  const router = useRouter();

  const navigationForQuestions = async (id: number) => {
    // setLoading(true);

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push(`/questoes/${id}`);
  };

  return (
    <div className={styles.container}>
      {questionsCard.map((question, index) => (
        <div className={styles.cardWrapper} key={`${question.id} ${index + 1}`}>
          <div className={styles.icon}>{question.icon}</div>

          <div className={styles.titleAndStatusWrapper}>
            <h1 className={styles.title}>{question.title}</h1>

            <div
              className={clsx(
                styles.status,
                question.status === "Respondido"
                  ? styles.answered
                  : styles.notAnswered
              )}
            >
              <p>{question.status}</p>
            </div>
          </div>

          <div className={styles.questions}>
            <p>
              {question.questions} <span>questões</span>
            </p>
          </div>

          <Button
            onClick={() => navigationForQuestions(question.id)}
            loading={loading}
          >
            Responder
          </Button>
        </div>
      ))}
    </div>
  );
}

export default memo(Card);
