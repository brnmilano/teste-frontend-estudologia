type Question = {
  questionNumber: number;
  question: string;
};

export type BookOfQuestions = {
  id: number;
  title: string;
  questions: Question[];
  answer?: string;
};
