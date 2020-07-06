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

export const Cadastro = ({ values }) => {
  return (
    <Fragment>
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
                Informações sobre ponto de venda físico ou stand de vendas
              </h2>
              {fields.map((loja, index) => (
                <Loja key={index} loja={loja} fields={fields} index={index} />
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
      <div className="form-group pt-3">
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
  );
};
