export interface Question {
  questionNumber: number;
  question: string;
  answer?: string;
}

export interface BookOfQuestions {
  id: number;
  title: string;
  questions: Question[];
}
