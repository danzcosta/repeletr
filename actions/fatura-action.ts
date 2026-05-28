"use server";

import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

export async function submeterFaturaAction(formData: FormData) {
  // 1. Inicializamos o Supabase DENTRO da função (Garante que as variáveis de ambiente já carregaram)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Credenciais do Supabase em falta no ficheiro .env");
    return { erro: "Erro de configuração no servidor." };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 2. Extrair os dados do formulário
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const file = formData.get("fatura") as File;

    if (!file || file.size === 0) {
      return { erro: "Ficheiro inválido ou não encontrado." };
    }

    // 3. Cibersegurança: Renomear ficheiro com UUID
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExt = file.name.split('.').pop();
    const nomeFicheiroSeguro = `${crypto.randomUUID()}.${fileExt}`;

    // 4. Upload para o Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("faturas-privadas")
      .upload(nomeFicheiroSeguro, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Erro no Storage:", uploadError);
      return { erro: "Falha ao guardar o ficheiro de forma segura." };
    }

    // 5. Guardar as informações na Base de Dados via Prisma
    await prisma.submissaoFatura.create({
      data: {
        nome,
        email,
        telefone: telefone || null,
        faturaPath: nomeFicheiroSeguro,
      },
    });

    return { sucesso: true };

  } catch (error) {
    console.error("Erro interno:", error);
    return { erro: "Ocorreu um erro inesperado no servidor." };
  }
}