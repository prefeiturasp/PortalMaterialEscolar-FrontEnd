import React, { useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import InputText from "components/Input/InputText";
import formatString from "format-string-by-pattern";
import {
  composeValidators,
  required,
  validaCEP,
  validaRangeCEP,
  validaTelefoneOuCelular,
  validaEmail,
  somenteAlfanumericos,
  somenteCaracteresEEspacos,
} from "helpers/validators";
import { toastError } from "components/Toast/dialogs";
import { getEnderecoPorCEP } from "services/cep.service";

export const DadosEmpresa = ({ values }) => {
  const [apiCEPfora, setApiCEPfora] = useState(false);

  return (
    <div>
      <h2>Dados da Empresa</h2>
      <div className="row">
        <div className="col-12">
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
      <div className="row">
        <div className="col-12">
          <Field
            component={InputText}
            label="Código da atividade econômica principal"
            name="cod_ativ_ec_princ"
            placeholder="Digite o código da atividade econômica principal da empresa"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
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
        <div className="col-sm-4 col-12">
          <Field
            component={InputText}
            parse={formatString("12345-678")}
            label="CEP da criança"
            name="cep_moradia"
            required
            validate={composeValidators(required, validaCEP, validaRangeCEP)}
            placeholder="Digite o CEP"
          />
          <OnChange name="cep_moradia">
            {async (value, previous) => {
              if (value.length === 9) {
                const response = await getEnderecoPorCEP(value);
                if (response.status === HTTP_STATUS.OK) {
                  if (response.data.resultado === "0") {
                    toastError("CEP não encontrado");
                    values.endereco_moradia = "";
                  } else if (
                    response.data.uf !== "SP" ||
                    response.data.cidade !== "São Paulo"
                  ) {
                    toastError("CEP não é do município de São Paulo");
                    values.endereco_moradia = "";
                  } else {
                    values.endereco_moradia =
                      response.data.tipo_logradouro +
                      " " +
                      response.data.logradouro;
                  }
                } else {
                  setApiCEPfora(true);
                }
              }
            }}
          </OnChange>
        </div>
        <div className="col-sm-8 col-12">
          <Field
            component={InputText}
            label="Endereço residencial da criança"
            name="endereco_moradia"
            required
            validate={required}
            disabled={!apiCEPfora}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 col-12">
          <Field
            component={InputText}
            maxlength={255}
            label="Número"
            name="numero_moradia"
            required
            validate={composeValidators(required, somenteAlfanumericos)}
            toUppercaseActive
          />
        </div>
        <div className="col-sm-8 col-12">
          <Field
            component={InputText}
            maxlength={20}
            label="Complemento"
            name="complemento_moradia"
            validate={somenteAlfanumericos}
            toUppercaseActive
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Field
            label="Nome completo do responsável"
            name="nome_responsavel"
            component={InputText}
            maxlength={255}
            type="text"
            placeholder="Nome completo do responsável"
            required
            validate={composeValidators(required, somenteCaracteresEEspacos)}
            toUppercaseActive
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Field
            component={InputText}
            placeholder={"Telefone do responsável"}
            label="Telefone do responsável"
            parse={
              values.telefone_responsavel &&
              values.telefone_responsavel.length + 1 <= 14
                ? formatString("(99) 9999-9999")
                : formatString("(99) 99999-9999")
            }
            name="telefone_responsavel"
            required
            type="text"
            validate={composeValidators(required, validaTelefoneOuCelular)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Field
            component={InputText}
            placeholder={"E-mail do responsável"}
            label="E-mail do responsável"
            name="email_responsavel"
            type="text"
            validate={composeValidators(validaEmail)}
          />
        </div>
      </div>
    </div>
  );
};
