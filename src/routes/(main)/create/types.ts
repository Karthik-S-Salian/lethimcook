import { z } from "zod";

export const formSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(2).max(50),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    ingredients: z.string(),
    instructions: z.string(),
});

export type FormSchema = typeof formSchema;
