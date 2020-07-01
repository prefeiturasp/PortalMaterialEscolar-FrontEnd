import React from "react";
import { Form } from "react-final-form";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import { DadosEmpresa } from "./components/DadosEmpresa";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Loja } from "./components/DadosLoja";
import { Botao } from "components/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Botao/constants";

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
              mutators={{
                ...arrayMutators,
              }}
              initialValues={{
                lojas: [{ nome_fantasia: "" }],
              }}
              render={({ handleSubmit, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className="card">
                    <div className="card-body">
                      <DadosEmpresa values={values} />
                    </div>
                  </div>
                  <FieldArray name="lojas">
                    {({ fields }) => (
                      <div className="card mt-3">
                        <div className="card-body">
                          <h2>
                            Informações sobre ponto de venda físico ou stand de
                            vendas
                          </h2>
                          {fields.map((loja, index) => (
                            <Loja
                              key={index}
                              loja={loja}
                              fields={fields}
                              index={index}
                            />
                          ))}
                          <Botao
                            style={BUTTON_STYLE.BLUE}
                            texto="Adicionar"
                            className="col-12 mt-3"
                            type={BUTTON_TYPE.BUTTON}
                            icon={BUTTON_ICON.PLUS}
                            onClick={() => fields.push({ firstName: "" })}
                          />
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </form>
              )}
            />
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
