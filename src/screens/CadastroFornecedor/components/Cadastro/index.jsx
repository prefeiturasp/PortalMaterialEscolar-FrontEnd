import React, { Fragment } from "react";
import { DadosEmpresa } from "./components/DadosEmpresa";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Loja } from "./components/DadosLoja";
import Botao from "components/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON,
} from "components/Botao/constants";
import { toastError } from "components/Toast/dialogs";
import "./style.scss";

export const Cadastro = ({ values, empresa }) => {
  const copiarEndereco = (fields) => {
    if (!values.copiar_endereco && values.end_cidade) {
      if (values.end_cidade !== "São Paulo") {
        toastError("Endereço não é do município de São Paulo");
      } else {
        fields.value[0].endereco = values.end_logradouro;
        fields.value[0].cidade = values.end_cidade;
        fields.value[0].uf = values.end_uf;
        fields.value[0].bairro = values.end_bairro;
        fields.value[0].cep = values.end_cep;
        fields.value[0].numero = values.end_numero;
        fields.value[0].complemento = values.end_complemento;
      }
    }
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <DadosEmpresa values={values} empresa={empresa} />
        </div>
      </div>
      <FieldArray name="lojas">
        {({ fields }) => (
          <div className="card mt-3 mb-3">
            <div className="card-body">
              <h2>
                Informações sobre ponto de venda físico ou stand de vendas
                {!empresa && (
                  <span className="ml-3 copiar-endereco-checkbox">
                    <Field
                      component={"input"}
                      name="copiar_endereco"
                      type="checkbox"
                      onClick={() => copiarEndereco(fields)}
                    />
                    Copiar endereço acima
                  </span>
                )}
              </h2>
              {fields.map((loja, index) => (
                <Loja
                  key={index}
                  loja={loja}
                  fields={fields}
                  index={index}
                  empresa={empresa}
                />
              ))}
              {!empresa && (
                <Botao
                  style={BUTTON_STYLE.BLUE}
                  texto="Adicionar"
                  className="col-12 mt-3"
                  type={BUTTON_TYPE.BUTTON}
                  icon={BUTTON_ICON.PLUS}
                  onClick={() => fields.push({ firstName: "" })}
                />
              )}
            </div>
          </div>
        )}
      </FieldArray>
      {!empresa && (
        <Fragment>
          <div className="form-group">
            <div className="form-check">
              <Field
                component={"input"}
                name="declaracao"
                className="form-check-input"
                required
                type="checkbox"
              />
              <label title="" className="form-check-label">
                Declaro que as informações acima prestadas são verdadeiras.
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <Field
                component={"input"}
                name="condicoes"
                className="form-check-input"
                required
                type="checkbox"
              />
              <label title="" className="form-check-label">
                Li e concordo com os termos e condições apresentados no
                <a
                  className="links-intrucoes"
                  href={"/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b> Edital</b>
                </a>
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <Field
                component={"input"}
                name="declaracao2"
                className="form-check-input"
                required
                type="checkbox"
              />
              <label title="" className="form-check-label">
                Declaro que fornecerei os itens pelos valores máximos indicados
                acima
              </label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 text-right">
              <Botao
                style={BUTTON_STYLE.BLUE}
                type={BUTTON_TYPE.SUBMIT}
                texto="Enviar"
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
