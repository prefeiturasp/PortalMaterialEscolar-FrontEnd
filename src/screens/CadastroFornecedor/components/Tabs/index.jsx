import React from "react";
import "./style.scss";

export const Tabs = ({ tab, setTab, uuid }) => {
  return (
    <div className="tabs pb-5">
      <div className="row">
        <div
          onClick={() => uuid && setTab("cadastro")}
          className={`tab col-4 ${
            tab === "cadastro" ? "active" : uuid ? "enabled" : "inactive"
          }`}
        >
          Cadastro
        </div>
        <div
          onClick={() => uuid && setTab("tabela-precos")}
          className={`tab col-4 ml-1 ${
            tab === "tabela-precos" ? "active" : uuid ? "enabled" : "inactive"
          }`}
        >
          Tabela de Preço
        </div>
        <div
          onClick={() => uuid && setTab("arquivos")}
          className={`tab col-4 ml-1 ${
            tab === "arquivos" ? "active" : uuid ? "enabled" : "inactive"
          }`}
        >
          Anexo
        </div>
      </div>
    </div>
  );
};
