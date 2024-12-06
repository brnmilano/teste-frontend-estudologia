import { memo } from "react";
import { questionsCard } from "@/utils/questions-utils";
import { Button } from "../Button";
import styles from "./styles.module.scss";
import clsx from "clsx";

function Card() {
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
            onClick={() => {
              console.log(question.id);
            }}
          >
            Responder
          </Button>
        </div>
      ))}
    </div>
  );
}

export default memo(Card);
