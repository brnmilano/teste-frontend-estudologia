import { ReactNode } from "react";

export interface QuestionsProps {
  id: number;
  icon: ReactNode;
  title: string;
  status: "Respondido" | "Não respondido";
  questions: number;
}
