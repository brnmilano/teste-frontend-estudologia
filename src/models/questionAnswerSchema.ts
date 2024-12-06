import { requiredTextSchema } from "@/constants/allSchemas";
import * as zod from "zod";

// Schema de validação para o formulário
export const QuestionAnswerValidationSchema = zod.object({
  answer: requiredTextSchema,
});

export type QuestionAnswerSchema = zod.infer<
  typeof QuestionAnswerValidationSchema
>;

export type fieldsTypes = "answer";
