import { remainingTimeKey } from "@/types/keys";
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

interface useCommonProps {
  children: ReactNode;
}

interface CommonContextData {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  minutes: string;
  seconds: string;
}

export const CommonContext = createContext({} as CommonContextData);

function CommonProvider({ children }: useCommonProps) {
  const totalMinutes = 25;

  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(totalMinutes * 60);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storageStateAsJSON = localStorage.getItem(remainingTimeKey);

        setTime(storageStateAsJSON ? JSON.parse(storageStateAsJSON) : []);
      } catch (error) {
        const parsedError =
          error instanceof Error ? error : new Error(String(error));

        toast.error(parsedError.message);
      }
    }
  }, []);

  useEffect(() => {
    const timerInterval = startTimer(
      totalMinutes,
      (updatedTime) => setTime(updatedTime),
      () => toast.error("Tempo esgotado!")
    );

    return () => clearInterval(timerInterval);
  }, [totalMinutes]);

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <CommonContext.Provider
      value={{
        loading,
        setLoading,
        minutes,
        seconds,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}

function useCommon() {
  return useContext(CommonContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { useCommon, CommonProvider };
