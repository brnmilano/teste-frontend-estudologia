import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface useQuestionsProps {
  children: ReactNode;
}

interface QuestionsContextData {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const QuestionsContext = createContext({} as QuestionsContextData);

function QuestionsProvider({ children }: useQuestionsProps) {
  const [loading, setLoading] = useState(false);

  return (
    <QuestionsContext.Provider
      value={{
        loading,
        setLoading,
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
