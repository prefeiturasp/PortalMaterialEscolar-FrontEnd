import React from "react";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import { Field, Form } from "react-final-form";
import formatString from "format-string-by-pattern";
import InputText from "components/Input/InputText";
import { composeValidators, required } from "helpers/validators";

export const CadastroFornecedor = () => {
  const onSubmit = async (values) => {};
  return (
    <div>
      <PaginaComCabecalhoRodape>
        <h1>Cadastro de Fornecedor</h1>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6 col-12">
                  <Field
                    component={InputText}
                    parse={formatString("99.999.999/9999-99")}
                    label="CNPJ"
                    name="cnpj"
                    required
                    validate={composeValidators(required)}
                    placeholder="Digite o CNPJ da Empresa"
                  />
                </div>
              </div>
            </form>
          )}
        />
      </PaginaComCabecalhoRodape>
    </div>
  );
};
