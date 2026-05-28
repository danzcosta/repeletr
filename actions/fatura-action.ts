"use server";

import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export async function submeterFaturaAction(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailDestino = process.env.EMAIL_DESTINO_NOTIFICACOES;

  if (!supabaseUrl || !supabaseKey || !resendApiKey || !emailDestino) {
    return { erro: "Erro de configuração no servidor." };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const resend = new Resend(resendApiKey);

  try {
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    
    // Ficheiros
    const file = formData.get("fatura") as File;
    const fileGas = formData.get("faturaGas") as File | null;

    if (!file || file.size === 0) {
      return { erro: "Fatura de eletricidade inválida ou não encontrada." };
    }

    // 1. Processar Fatura Eletricidade
    const bytes1 = await file.arrayBuffer();
    const buffer1 = Buffer.from(bytes1);
    const fileExt1 = file.name.split('.').pop();
    const nomeSeguro1 = `${crypto.randomUUID()}.${fileExt1}`;

    await supabase.storage.from("faturas-privadas").upload(nomeSeguro1, buffer1, { contentType: file.type });
    
    // Preparar array de anexos para o Email
    const anexosEmail = [{ filename: `Eletricidade_${file.name}`, content: buffer1 }];

    // 2. Processar Fatura Gás (Se existir)
    let nomeSeguro2 = null;
    if (fileGas && fileGas.size > 0) {
      const bytes2 = await fileGas.arrayBuffer();
      const buffer2 = Buffer.from(bytes2);
      const fileExt2 = fileGas.name.split('.').pop();
      nomeSeguro2 = `${crypto.randomUUID()}.${fileExt2}`;

      await supabase.storage.from("faturas-privadas").upload(nomeSeguro2, buffer2, { contentType: fileGas.type });
      anexosEmail.push({ filename: `Gas_${fileGas.name}`, content: buffer2 });
    }

    // 3. Guardar na Base de Dados
    await prisma.submissaoFatura.create({
      data: {
        nome,
        email,
        telefone: telefone || null,
        faturaPath: nomeSeguro1,
        faturaGasPath: nomeSeguro2,
      },
    });

    // 4. Enviar Email
    await resend.emails.send({
      from: 'REPELETR Notificações <onboarding@resend.dev>',
      to: emailDestino,
      subject: `🚨 Simulação Recebida - ${nome}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Nova Submissão! ⚡</h2>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone || 'Não fornecido'}</p>
            <p><strong>Fatura Gás incluída?</strong> ${nomeSeguro2 ? '✅ Sim' : '❌ Não'}</p>
          </div>
          <p>As faturas seguem em <strong>anexo</strong> neste email.</p>
        </div>
      `,
      attachments: anexosEmail,
    });

    return { sucesso: true };

  } catch (error) {
    console.error("Erro interno:", error);
    return { erro: "Ocorreu um erro inesperado no servidor." };
  }
}