import { z } from "zod";

const chatValidation = z.object({
  prompt: z.string({ message: "input should not be empty" }).trim(),
});

export default chatValidation;
