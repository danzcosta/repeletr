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
    console.error("Credenciais em falta no ficheiro .env");
    return { erro: "Erro de configuração no servidor." };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const resend = new Resend(resendApiKey);

  try {
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const file = formData.get("fatura") as File;

    if (!file || file.size === 0) {
      return { erro: "Ficheiro inválido ou não encontrado." };
    }

    // 1. Preparar o ficheiro
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExt = file.name.split('.').pop();
    const nomeFicheiroSeguro = `${crypto.randomUUID()}.${fileExt}`;

    // 2. Upload para o Supabase (Continua a guardar no cofre por segurança)
    const { error: uploadError } = await supabase.storage
      .from("faturas-privadas")
      .upload(nomeFicheiroSeguro, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Erro no Storage:", uploadError);
      return { erro: "Falha ao guardar o ficheiro." };
    }

    // 3. Guardar na Base de Dados
    await prisma.submissaoFatura.create({
      data: {
        nome,
        email,
        telefone: telefone || null,
        faturaPath: nomeFicheiroSeguro,
      },
    });

    // 4. Enviar Email COM O ANEXO
    await resend.emails.send({
      from: 'REPELETR Notificações <onboarding@resend.dev>',
      to: emailDestino,
      subject: `🚨 Nova Simulação Recebida - ${nome}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Nova Fatura Submetida! ⚡</h2>
          <p>Recebeste um novo pedido de simulação através do portal <strong>REPELETR</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email do Cliente:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Telefone:</strong> ${telefone || 'Não fornecido'}</p>
          </div>

          <p>A fatura do cliente segue em <strong>anexo</strong> neste email.</p>
          <hr style="border: 1px solid #eee; margin-top: 30px;" />
          <p style="font-size: 12px; color: #888;">Mensagem gerada automaticamente pelo sistema REPELETR.</p>
        </div>
      `,
      // A MAGIA ACONTECE AQUI:
      attachments: [
        {
          filename: file.name, // Mantém o nome original que o cliente deu ao ficheiro
          content: buffer,     // Envia a imagem/pdf diretamente da memória
        },
      ],
    });

    return { sucesso: true };

  } catch (error) {
    console.error("Erro interno:", error);
    return { erro: "Ocorreu um erro inesperado no servidor." };
  }
}