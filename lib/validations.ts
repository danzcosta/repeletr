import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

export const formFaturaSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Por favor, insere um email válido."),
  telefone: z.string().optional(),
  fatura: z
    .any()
    .refine((files) => files?.length === 1, "O ficheiro da fatura é obrigatório.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "O ficheiro não pode exceder 5MB.")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Apenas aceitamos .pdf, .jpg ou .png."
    ),
});

export type FormFaturaData = z.infer<typeof formFaturaSchema>;