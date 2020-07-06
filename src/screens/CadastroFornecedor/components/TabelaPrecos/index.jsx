import React from "react";
import "./style.scss";

export const TabelaPrecos = () => {
  return (
    <div className="tabela-precos">
      <div className="card">
        <div className="card-body">
          <h2>Preços (fornecimento)</h2>
          <h3 className="pt-2">
            Selecione os materiais escolares disponíveis em seu estabelecimento
            (s) e insira o preço da unidade.
          </h3>
          <hr />
        </div>
      </div>
    </div>
  );
};
