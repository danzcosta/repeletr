export default function Home() {
  return (
    <main>

      {/* HERO */}

      <section className="hero">

        <h1>
          Está a pagar mais do que devia pela sua energia?
        </h1>

        <p className="hero-text">
          Em mais de 90% dos casos analisados, os clientes conseguem
          reduzir até 20% no custo base da eletricidade ao comparar o
          serviço atual com uma nova solução de energia.
        </p>

        <p className="hero-text">
          Além da possível redução no valor mensal, ainda terá acesso
          a vantagens adicionais como:
        </p>

      </section>

      {/* CARDS */}

      <section className="plans-section">

        {/* CARD 0 */}

<div className="plan-card">

  <div className="plan-header">

    <div>
      <h2>Motor</h2>
      <p>Combustível</p>
    </div>

    <div className="main-highlight">
      10 cênt./litro
    </div>

  </div>

  <div className="benefits">

    <div className="benefit-row">

      <div className="benefit-left">

        <div className="icon-circle">⚡</div>

        <div>
          <h4>Combustível</h4>

          <p>
            Desconto imediato até 6 cênt./litro
          </p>
        </div>

      </div>

      <span className="benefit-value">
        10 cênt.
      </span>

    </div>

    <div className="benefit-row">

      <div className="benefit-left">

        <div className="icon-circle">⌁</div>

        <div>
          <h4>Carregamento elétrico</h4>

          <p>
            Crédito adicional na app
          </p>
        </div>

      </div>

      <span className="benefit-value">
        10%
      </span>

    </div>

    <div className="benefit-row">

      <div className="benefit-left">

        <div className="icon-circle">△</div>

        <div>
          <h4>Garrafa de gás</h4>

          <p>
            Cashback direto em saldo
          </p>
        </div>

      </div>

      <span className="benefit-value">
        1%
      </span>

    </div>

  </div>

</div>

        {/* CARD 1 */}

        <div className="plan-card">

          <div className="plan-header">

            <div>
              <h2>Motor & Luz</h2>
              <p>Eletricidade</p>
            </div>

            <div className="main-highlight">
              15 cênt./litro
            </div>

          </div>

          <div className="benefits">

            <div className="benefit-row">

              <div className="benefit-left">

                <div className="icon-circle">⚡</div>

                <div>
                  <h4>Combustível</h4>

                  <p>
                    Desconto imediato até 6 cênt./litro
                  </p>
                </div>

              </div>

              <span className="benefit-value">
                15 cênt.
              </span>

            </div>

            <div className="benefit-row">

              <div className="benefit-left">

                <div className="icon-circle">◌</div>

                <div>
                  <h4>Eletricidade e gás</h4>

                  <p>
                    Saldo acumulado na aplicação
                  </p>
                </div>

              </div>

              <span className="benefit-value">
                2%
              </span>

            </div>

            <div className="benefit-row">

              <div className="benefit-left">

                <div className="icon-circle">⌁</div>

                <div>
                  <h4>Carregamento elétrico</h4>

                  <p>
                    Crédito adicional na app
                  </p>
                </div>

              </div>

              <span className="benefit-value">
                15%
              </span>

            </div>

            <div className="benefit-row">

              <div className="benefit-left">

                <div className="icon-circle">△</div>

                <div>
                  <h4>Garrafa de gás</h4>

                  <p>
                    Cashback direto em saldo
                  </p>
                </div>

              </div>

              <span className="benefit-value">
                2%
              </span>

            </div>

          </div>

        </div>

        {/* CARD 2 */}

        <div className="plan-card premium">

          <div className="plan-header">

            <div>
              <h2>Motor, Luz e Calor</h2>
              <p>Eletricidade + Gás</p>
            </div>

            <div className="main-highlight">
              20 cênt./litro
            </div>

          </div>

          <div className="benefits">

            <div className="benefit-row">

              <div className="benefit-left">

                <div className="icon-circle">⚡</div>

                <div>
                  <h4>Combustível</h4>

                  <p>
                    Desconto imediato até 6 cênt./litro
                  </p>
                </div>

              </div>

              <span className="benefit-value">
                20 cênt.
              </span>

            </div>

            <div className="benefit-row">

              <div className="benefit-left">

                <div className="icon-circle">◌</div>

                <div>
                  <h4>Eletricidade e gás</h4>

                  <p>
                    Saldo acumulado na aplicação
                  </p>
                </div>

              </div>

              <span className="benefit-value">
                3%
              </span>

            </div>

            <div className="benefit-row">

              <div className="benefit-left">

                <div className="icon-circle">⌁</div>

                <div>
                  <h4>Carregamento elétrico</h4>

                  <p>
                    Crédito adicional na app
                  </p>
                </div>

              </div>

              <span className="benefit-value">
                20%
              </span>

            </div>

            <div className="benefit-row">

              <div className="benefit-left">

                <div className="icon-circle">△</div>

                <div>
                  <h4>Garrafa de gás</h4>

                  <p>
                    Cashback direto em saldo
                  </p>
                </div>

              </div>

              <span className="benefit-value">
                3%
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* INFO */}

      <section className="bottom-info">

        <p>
          Cada caso depende do consumo e das condições atuais do cliente.
        </p>

        <p>
          Disponibilizamos uma simulação gratuita e sem compromisso,
          onde poderá comparar os seus custos atuais com uma alternativa
          mais vantajosa.
        </p>

      </section>

      {/* CTA */}

      <div className="cta-container">

        <a href="/formulario" className="cta-button">
          Faça a sua simulação gratuita
        </a>

      </div>

    </main>
  );
}