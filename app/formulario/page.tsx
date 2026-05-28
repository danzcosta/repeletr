"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFaturaSchema, FormFaturaData } from "@/lib/validations";
import { submeterFaturaAction } from "@/actions/fatura-action";
import { useState } from "react";

export default function Home() {
  const [mensagemStatus, setMensagemStatus] = useState<{ tipo: "sucesso" | "erro", texto: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFaturaData>({
    resolver: zodResolver(formFaturaSchema),
  });

  const onSubmit = async (data: FormFaturaData) => {
    setMensagemStatus(null); // Limpar mensagens anteriores

    // Como vamos enviar um ficheiro real para o servidor, usamos FormData
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("email", data.email);
    if (data.telefone) formData.append("telefone", data.telefone);
    formData.append("fatura", data.fatura[0]); // O ficheiro em si

    // Chamar a nossa Server Action Segura
    const resultado = await submeterFaturaAction(formData);

    if (resultado.erro) {
      setMensagemStatus({ tipo: "erro", texto: resultado.erro });
    } else if (resultado.sucesso) {
      setMensagemStatus({ tipo: "sucesso", texto: "Fatura submetida com sucesso! Obrigado." });
      reset(); // Limpa o formulário após sucesso
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Envio de Faturas 🛡️
        </h1>

        {/* Feedback Visual para o Utilizador */}
        {mensagemStatus && (
          <div className={`p-4 mb-6 rounded-lg text-sm font-semibold ${mensagemStatus.tipo === "sucesso" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {mensagemStatus.texto}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              {...register("nome")}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
            {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone (Opcional)</label>
            <input
              {...register("telefone")}
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fatura (PDF ou Imagem)</label>
            <input
              {...register("fatura")}
              type="file"
              accept=".pdf, image/jpeg, image/png"
              className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-black"
            />
            {errors.fatura && <p className="text-red-500 text-xs mt-1">{errors.fatura.message as string}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "A Guardar no Cofre..." : "Enviar Fatura"}
          </button>
        </form>
      </div>
    </main>
  );
}