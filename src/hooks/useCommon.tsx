import { startTimer } from "@/utils/timer";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useQuestions } from "./useQuestions";

interface useCommonProps {
  children: ReactNode;
}

interface CommonContextData {
  minutes: string;
  seconds: string;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const CommonContext = createContext({} as CommonContextData);

function CommonProvider({ children }: useCommonProps) {
  const { step } = useQuestions();

  const totalMinutes = 25;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [time, setTime] = useState(totalMinutes * 60);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    setTime(totalMinutes * 60);

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    const newTimerInterval = startTimer(
      totalMinutes,
      (updatedTime) => setTime(updatedTime),
      () => toast.error("Tempo esgotado!")
    );

    setTimerInterval(newTimerInterval);
  }, [step]);

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <CommonContext.Provider
      value={{
        minutes,
        seconds,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}

function useCommon() {
  return useContext(CommonContext);
}

export { useCommon, CommonProvider };
