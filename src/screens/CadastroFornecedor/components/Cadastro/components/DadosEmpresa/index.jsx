import React from "react";
import HTTP_STATUS from "http-status-codes";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import InputText from "components/Input/InputText";
import formatString from "format-string-by-pattern";
import {
  composeValidators,
  required,
  validaCEP,
  validaTelefoneOuCelular,
  validaEmail,
  somenteAlfanumericos,
  somenteCaracteresEEspacos,
  validaCNPJ,
} from "helpers/validators";
import { toastError } from "components/Toast/dialogs";
import { getEnderecoPorCEP } from "services/cep.service";

export const DadosEmpresa = ({ values }) => {
  return (
    <div>
      <h2>Dados da Empresa</h2>
      <div className="row">
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            parse={formatString("99.999.999/9999-99")}
            label="CNPJ"
            name="cnpj"
            required
            validate={composeValidators(required, validaCNPJ)}
            placeholder="Digite o CNPJ da Empresa"
          />
        </div>
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            label="Razão Social"
            name="razao_social"
            required
            validate={composeValidators(required)}
            placeholder="Digite a Razão Social da Empresa"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            parse={formatString("12345-678")}
            label="CEP"
            name="cep"
            required
            validate={composeValidators(required, validaCEP)}
            placeholder="Digite o CEP"
          />
          <OnChange name="cep">
            {async (value, previous) => {
              if (value.length === 9) {
                const response = await getEnderecoPorCEP(value);
                if (response.status === HTTP_STATUS.OK) {
                  if (response.data.resultado === "0") {
                    toastError("CEP não encontrado");
                    values.endereco = "";
                    values.uf = "";
                    values.cidade = "";
                    values.bairro = "";
                  } else {
                    values.endereco =
                      response.data.tipo_logradouro +
                      " " +
                      response.data.logradouro;
                    values.uf = response.data.uf;
                    values.cidade = response.data.cidade;
                    values.bairro = response.data.bairro;
                  }
                }
              }
            }}
          </OnChange>
        </div>
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            label="Bairro"
            name="bairro"
            required
            validate={required}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            label="Endereço"
            name="endereco"
            required
            validate={required}
          />
        </div>
        <div className="col-sm-4 col-12">
          <Field
            component={InputText}
            maxlength={20}
            label="Complemento"
            name="complemento"
            validate={somenteAlfanumericos}
          />
        </div>
        <div className="col-sm-2 col-12">
          <Field
            component={InputText}
            maxlength={255}
            label="Número"
            name="numero"
            required
            validate={composeValidators(required, somenteAlfanumericos)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-10 col-12">
          <Field
            component={InputText}
            maxlength={20}
            label="Cidade"
            name="cidade"
            validate={somenteAlfanumericos}
            required
          />
        </div>
        <div className="col-sm-2 col-12">
          <Field
            component={InputText}
            maxlength={255}
            label="UF"
            name="uf"
            required
            validate={composeValidators(required, somenteAlfanumericos)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Field
            label="Nome completo"
            name="nome"
            component={InputText}
            maxlength={255}
            type="text"
            placeholder="Nome completo"
            required
            validate={composeValidators(required, somenteCaracteresEEspacos)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            placeholder={"Telefone"}
            label="Telefone"
            parse={
              values.telefone && values.telefone.length + 1 <= 14
                ? formatString("(99) 9999-9999")
                : formatString("(99) 99999-9999")
            }
            name="telefone"
            required
            type="text"
            validate={composeValidators(required, validaTelefoneOuCelular)}
          />
        </div>
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            placeholder={"E-mail"}
            label="E-mail"
            name="email"
            type="text"
            validate={composeValidators(validaEmail)}
          />
        </div>
      </div>
    </div>
  );
};
