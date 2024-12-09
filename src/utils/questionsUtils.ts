import { createElement } from "react";
import type { QuestionsProps } from "@/types/questions";
import { contentBookOfQuestions } from "./questionsLists";
import PencilIconSvg from "@/Icons/PencilIcon";

const questionsQuantity = contentBookOfQuestions.map(
  (book) => book.questions.length
);

export const questionsCard: QuestionsProps[] = [
  {
    id: 1,
    icon: createElement(PencilIconSvg),
    title: "Título do caderno de questões 1",
    status: "Respondido",
    questions: questionsQuantity[0],
  },
  {
    id: 2,
    icon: createElement(PencilIconSvg),
    title: "Título do caderno de questões 2",
    status: "Não respondido",
    questions: questionsQuantity[1],
  },
  {
    id: 3,
    icon: createElement(PencilIconSvg),
    title: "Título do caderno de questões 3",
    status: "Respondido",
    questions: questionsQuantity[2],
  },
];
