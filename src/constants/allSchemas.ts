import { requiredField } from "@/models/messages";
import * as zod from "zod";

// Required
export const requiredTextSchema = zod
  .string({
    message: requiredField,
  })
  .min(1, requiredField);
