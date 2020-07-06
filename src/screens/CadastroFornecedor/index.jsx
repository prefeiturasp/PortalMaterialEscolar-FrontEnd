import React, { useState } from "react";
import { Form } from "react-final-form";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import arrayMutators from "final-form-arrays";
import { Tabs } from "./components/Tabs";
import { Cadastro } from "./components/Cadastro";
import "./style.scss";

export const CadastroFornecedor = () => {
  const [tab, setTab] = useState("cadastro");
  const [uuid, setUuid] = useState(null);

  const onSubmit = async (values) => {};
  return (
    <div className="cadastro-fornecedor">
      <PaginaComCabecalhoRodape>
        <h1>Cadastro de Fornecedor</h1>
        <Tabs uuid={uuid} tab={tab} setTab={setTab} />
        <Form
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
          initialValues={{
            lojas: [{ nome_fantasia: "", telefone: "" }],
          }}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              {tab === "cadastro" && <Cadastro values={values} />}
            </form>
          )}
        />
      </PaginaComCabecalhoRodape>
    </div>
  );
};
