import React from "react";
import { Form } from "react-final-form";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import { DadosEmpresa } from "./components/DadosEmpresa";

export const CadastroFornecedor = () => {
  const onSubmit = async (values) => {};
  return (
    <div>
      <PaginaComCabecalhoRodape>
        <div className="row">
          <div className="offset-md-2 col-md-8 col-12">
            <h1>Cadastro de Fornecedor</h1>
            <Form
              onSubmit={onSubmit}
              initialValues={{}}
              render={({ handleSubmit, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <DadosEmpresa values={values} />
                </form>
              )}
            />
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
