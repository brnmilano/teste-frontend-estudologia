import { getCookie, setCookie } from "cookies-next";
import { questionBookKey } from "@/types/keys";
import type { BookOfQuestions } from "@/types/questionsBook";
import { contentBookOfQuestions } from "@/utils/questionsLists";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface useQuestionsProps {
  children: ReactNode;
}

interface QuestionsContextData {
  questionBook: BookOfQuestions[];
  setQuestionBook: Dispatch<SetStateAction<BookOfQuestions[]>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export const QuestionsContext = createContext({} as QuestionsContextData);

function QuestionsProvider({ children }: useQuestionsProps) {
  const [step, setStep] = useState(1);

  const [questionBook, setQuestionBook] = useState<BookOfQuestions[]>(() => {
    const storedQuestions = getCookie(questionBookKey);

    return storedQuestions
      ? JSON.parse(storedQuestions as string)
      : contentBookOfQuestions;
  });

  useEffect(() => {
    setCookie(questionBookKey, JSON.stringify(questionBook), {
      path: "/",
      maxAge: 60 * 10,
    });
  }, [questionBook]);

  return (
    <QuestionsContext.Provider
      value={{
        questionBook,
        setQuestionBook,
        step,
        setStep,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  return useContext(QuestionsContext);
}

export { useQuestions, QuestionsProvider };
