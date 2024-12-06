import { createElement } from "react";
import type { QuestionsProps } from "@/types/questions";
import PencilIconSvg from "@/Icons/PencilIcon";

export const questionsCard: QuestionsProps[] = [
  {
    id: 1,
    icon: createElement(PencilIconSvg),
    title: "Título do caderno de questões 1",
    status: "Respondido",
    questions: 10,
  },
  {
    id: 2,
    icon: createElement(PencilIconSvg),
    title: "Título do caderno de questões 2",
    status: "Não respondido",
    questions: 5,
  },
  {
    id: 3,
    icon: createElement(PencilIconSvg),
    title: "Título do caderno de questões 3",
    status: "Respondido",
    questions: 3,
  },
];
