import { questionBookKey } from "@/types/keys";
import { BookOfQuestions } from "@/types/questionsBook";
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
}

export const QuestionsContext = createContext({} as QuestionsContextData);

function QuestionsProvider({ children }: useQuestionsProps) {
  const [questionBook, setQuestionBook] = useState<BookOfQuestions[]>(() => {
    if (typeof window !== "undefined") {
      const storedQuestions = localStorage.getItem(questionBookKey);

      return storedQuestions
        ? JSON.parse(storedQuestions)
        : contentBookOfQuestions;
    }
    return contentBookOfQuestions;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(questionBookKey, JSON.stringify(questionBook));
    }
  }, [questionBook]);

  return (
    <QuestionsContext.Provider
      value={{
        questionBook,
        setQuestionBook,
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
