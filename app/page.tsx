import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 relative pb-20">
      {/* Secção Inicial (Hero) */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Está a pagar mais do que devia pela sua energia?
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Em mais de <span className="font-bold text-blue-600">90% dos casos analisados</span>, os clientes conseguem reduzir até <span className="font-bold text-blue-600">20% no custo base da eletricidade</span> ao comparar o serviço atual com uma nova solução de energia.
        </p>
        <p className="text-md text-gray-500 mb-12">
          Além da possível redução no valor mensal, ainda terá acesso a vantagens adicionais fantásticas.
        </p>
      </section>

      {/* Secção de Planos / Benefícios (Inspirado na imagem) */}
      <section className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 mb-16">
        
        {/* Cartão 1: Eletricidade */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Motor e Luz</h2>
          <p className="text-sm text-gray-500 mb-6">Contrate Eletricidade</p>
          
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <p className="text-4xl font-bold text-red-500">15 <span className="text-lg text-gray-600 font-normal">cênt./litro</span></p>
              <p className="text-sm text-gray-600 mt-2">Desconto em combustível (até 6 cênt./litro imediato e o restante em saldo REPELETR).</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <p className="text-3xl font-bold text-red-500">2<span className="text-lg text-gray-600 font-normal">% do valor total</span></p>
              <p className="text-sm text-gray-600 mt-1">Em saldo REPELETR</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-500">15<span className="text-lg text-gray-600 font-normal">% do valor total</span></p>
              <p className="text-sm text-gray-600 mt-1">Em saldo REPELETR</p>
            </div>
          </div>
        </div>

        {/* Cartão 2: Eletricidade + Gás */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-8 hover:shadow-xl transition relative">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
            + POUPANÇA
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Motor, Luz e Calor</h2>
          <p className="text-sm text-gray-500 mb-6">Contrate Eletricidade e Gás</p>
          
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <p className="text-4xl font-bold text-red-500">20 <span className="text-lg text-gray-600 font-normal">cênt./litro</span></p>
              <p className="text-sm text-gray-600 mt-2">Desconto em combustível (até 6 cênt./litro imediato e o restante em saldo REPELETR).</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <p className="text-3xl font-bold text-red-500">3<span className="text-lg text-gray-600 font-normal">% do valor total</span></p>
              <p className="text-sm text-gray-600 mt-1">Em saldo REPELETR</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-500">20<span className="text-lg text-gray-600 font-normal">% do valor total</span></p>
              <p className="text-sm text-gray-600 mt-1">Em saldo REPELETR</p>
            </div>
          </div>
        </div>

      </section>

      {/* Fecho de Venda (Call to Action final) */}
      <section className="max-w-3xl mx-auto px-4 text-center pb-16">
        <p className="text-gray-700 font-medium mb-4">
          Cada caso depende do consumo e das condições atuais do cliente.
        </p>
        <p className="text-gray-600">
          Por isso, disponibilizamos uma simulação gratuita e sem compromisso, onde poderá comparar os seus custos atuais com uma alternativa mais vantajosa.
        </p>
      </section>

      {/* BOTÃO FIXO (Canto Inferior Direito) */}
      <Link 
        href="/formulario" 
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-blue-600 text-white font-bold py-4 px-6 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 z-50 flex items-center gap-2"
      >
        <span>📄</span> Preencha o Formulário
      </Link>
    </main>
  );
}