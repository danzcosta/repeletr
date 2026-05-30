"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFaturaSchema, FormFaturaData } from "@/lib/validations";
import { submeterFaturaAction } from "@/actions/fatura-action";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const [mensagemStatus, setMensagemStatus] = useState<{
    tipo: "sucesso" | "erro",
    texto: string
  } | null>(null);
  
  const [showModal, setShowModal] = useState(false);
  const [indicativo, setIndicativo] = useState("+351");

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
      formData.append("telefone", `${indicativo} ${data.telefone}`);
    }

    // 1. Fatura de Eletricidade (Obrigatória)
    formData.append("fatura", data.fatura[0]);

    // 2. Fatura de Gás (Opcional) - Só anexa se o cliente tiver escolhido um ficheiro
    if (data.faturaGas && data.faturaGas.length > 0) {
      formData.append("faturaGas", data.faturaGas[0]);
    }

    const resultado = await submeterFaturaAction(formData);

    if (resultado.erro) {
      setMensagemStatus({
        tipo: "erro",
        texto: resultado.erro,
      });
    } else {
      setShowModal(true);
      reset();
      setIndicativo("+351");
    }
  };

  return (
    <main className="form-page relative">
      
      {/* --- INÍCIO DO POP-UP (MODAL) BLINDADO --- */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(5px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            maxWidth: "400px",
            width: "90%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            
            {/* Ícone de Sucesso */}
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#d1fae5",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem"
            }}>
              <svg style={{ width: "40px", height: "40px", color: "#10b981" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111827", marginBottom: "0.5rem" }}>
              Bem-sucedido!
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "2rem", lineHeight: "1.5" }}>
              A sua fatura foi enviada com sucesso. Irá receber a nossa simulação personalizada e sem compromisso no seu email dentro de <span style={{ fontWeight: "bold", color: "#1f2937" }}>24 horas</span>.
            </p>
            
            <button
              onClick={() => {
                setShowModal(false);
                router.push('/'); 
              }}
              style={{
                width: "100%",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontWeight: "bold",
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1d4ed8"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}
      {/* --- FIM DO POP-UP --- */}

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

          {mensagemStatus && (
            <div className={`status-message ${mensagemStatus.tipo}`}>
              {mensagemStatus.texto}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="energy-form"
          >
            {/* NOME */}
            <div className="input-group">
              <label>Nome Completo</label>
              <input
                {...register("nome")}
                type="text"
                placeholder="O seu nome"
              />
              {errors.nome && (
                <p className="error-text">{errors.nome.message}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label>Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="email@exemplo.com"
              />
              {errors.email && (
                <p className="error-text">{errors.email.message}</p>
              )}
            </div>

            {/* TELEFONE COM INDICATIVO */}
            <div className="input-group">
              <label>Telefone (Opcional)</label>
              
              <div style={{ display: "flex", gap: "10px" }}>
                <select
                  value={indicativo}
                  onChange={(e) => setIndicativo(e.target.value)}
                  style={{
                    padding: "0 10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    color: "#333",
                    width: "115px",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="+351">🇵🇹 +351</option>
                  <option value="+55">🇧🇷 +55</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+41">🇨🇭 +41</option>
                </select>
                
                <input
                  {...register("telefone")}
                  type="tel"
                  placeholder="912 345 678"
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            {/* FICHEIRO ELETRICIDADE */}
            <div className="input-group">
              <label>Fatura de Eletricidade (Obrigatório)</label>
              <input
                {...register("fatura")}
                type="file"
                accept=".pdf,image/jpeg,image/png"
                className="file-input"
              />
              {errors.fatura && (
                <p className="error-text">{errors.fatura.message as string}</p>
              )}
            </div>

            {/* FICHEIRO GÁS (NOVO) */}
            <div className="input-group">
              <label>Fatura de Gás (Opcional)</label>
              <input
                {...register("faturaGas")}
                type="file"
                accept=".pdf,image/jpeg,image/png"
                className="file-input"
              />
              {/* Usamos as string no erro porque o Zod formata assim o 'any' type error */}
              {errors.faturaGas && (
                <p className="error-text">{errors.faturaGas.message as string}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "A analisar..." : "Submeter"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}