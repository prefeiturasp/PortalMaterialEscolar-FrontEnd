import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import arrayMutators from "final-form-arrays";
import { Tabs } from "./components/Tabs";
import { Cadastro } from "./components/Cadastro";
import { Arquivos } from "./components/Arquivos";
import { TabelaPrecos } from "./components/TabelaPrecos";
import "./style.scss";

export const CadastroFornecedor = () => {
  const [empresa, setEmpresa] = useState(null);
  const [tab, setTab] = useState("tabela-precos");
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const carregaEmpresa = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");
      if (uuid) {
        setTab("anexos");
        setUuid(uuid);
      }
    };
    carregaEmpresa();
  }, []);

  const onSubmit = async (values) => {
    setTab("tabela-precos");
  };

  return (
    <div className="cadastro-fornecedor">
      <PaginaComCabecalhoRodape>
        <div className="container">
          <h1>Cadastro de Fornecedor</h1>
          <Tabs uuid={uuid} tab={tab} setTab={setTab} />
          <Form
            onSubmit={onSubmit}
            mutators={{
              ...arrayMutators,
            }}
            initialValues={{
              apontador_check: false,
              lojas: [{ nome_fantasia: "", telefone: "" }],
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                {tab === "cadastro" && <Cadastro values={values} />}
                {tab === "tabela-precos" && (
                  <TabelaPrecos form={form} values={values} />
                )}
                {tab === "arquivos" && <Arquivos empresa={empresa} />}
              </form>
            )}
          />
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
