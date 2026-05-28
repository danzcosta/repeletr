import { z } from "zod";

export const formFaturaSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório"),
  email: z.string().email("Insira um email válido"),
  telefone: z.string().optional(),
  fatura: z.any()
    .refine((files) => files?.length === 1, "A fatura principal é obrigatória."),
  faturaGas: z.any().optional(), // Novo campo opcional
});

export type FormFaturaData = z.infer<typeof formFaturaSchema>;