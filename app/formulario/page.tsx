"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFaturaSchema, FormFaturaData } from "@/lib/validations";
import { submeterFaturaAction } from "@/actions/fatura-action";
import { useState } from "react";

export default function Home() {

  const [mensagemStatus, setMensagemStatus] = useState<{
    tipo: "sucesso" | "erro",
    texto: string
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFaturaData>({
    resolver: zodResolver(formFaturaSchema),
  });

  const onSubmit = async (data: FormFaturaData) => {

    setMensagemStatus(null);

    const formData = new FormData();

    formData.append("nome", data.nome);
    formData.append("email", data.email);

    if (data.telefone) {
      formData.append("telefone", data.telefone);
    }

    formData.append("fatura", data.fatura[0]);

    const resultado = await submeterFaturaAction(formData);

    if (resultado.erro) {

      setMensagemStatus({
        tipo: "erro",
        texto: resultado.erro,
      });

    } else {

      setMensagemStatus({
        tipo: "sucesso",
        texto: "Fatura submetida com sucesso! Obrigado.",
      });

      reset();
    }
  };

  return (

    <main className="form-page">

      {/* HERO */}

      <section className="form-hero">

        <span className="form-badge">
          Simulação Gratuita
        </span>

        <h1>
          Faça a sua simulação gratuita e descubra quanto pode poupar!
        </h1>

        <p>
          Analisamos gratuitamente os seus custos atuais e mostramos
          quanto poderá poupar com uma solução mais vantajosa.
        </p>

      </section>

      {/* FORM CARD */}

      <section className="form-wrapper">

        <div className="form-card">

          <div className="form-card-header">

            <h2>
              Dados para análise
            </h2>

            <p>
              Os seus dados são tratados com total segurança.
            </p>

          </div>

          {/* STATUS */}

          {mensagemStatus && (

            <div className={`status-message ${mensagemStatus.tipo}`}>

              {mensagemStatus.texto}

            </div>

          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="energy-form"
          >

            {/* NOME */}

            <div className="input-group">

              <label>
                Nome Completo
              </label>

              <input
                {...register("nome")}
                type="text"
                placeholder="O seu nome"
              />

              {errors.nome && (
                <p className="error-text">
                  {errors.nome.message}
                </p>
              )}

            </div>

            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="email@exemplo.com"
              />

              {errors.email && (
                <p className="error-text">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* TELEFONE */}

            <div className="input-group">

              <label>
                Telefone (Opcional)
              </label>

              <input
                {...register("telefone")}
                type="tel"
                placeholder="+351 912 345 678"
              />

            </div>

            {/* FICHEIRO */}

            <div className="input-group">

              <label>
                Fatura (PDF ou Imagem)
              </label>

              <input
                {...register("fatura")}
                type="file"
                accept=".pdf,image/jpeg,image/png"
                className="file-input"
              />

              {errors.fatura && (
                <p className="error-text">
                  {errors.fatura.message as string}
                </p>
              )}

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >

              {isSubmitting
                ? "A analisar..."
                : "Enviar Fatura"}

            </button>

          </form>

        </div>

      </section>

    </main>
  );
}