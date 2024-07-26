import { z } from "zod";

export const MessagesSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be atleast 10 characters " })
    .max(300, { message: "COntent must be no more then 300 characters" }),

});
