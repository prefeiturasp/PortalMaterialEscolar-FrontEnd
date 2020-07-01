import React, { useState } from "react";
import HTTP_STATUS from "http-status-codes";
import InputText from "components/Input/InputText";
import { Botao } from "components/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Botao/constants";
import { Field } from "react-final-form";
import {
  composeValidators,
  required,
  validaCEP,
  validaRangeCEP,
  somenteAlfanumericos,
} from "helpers/validators";
import formatStringByPattern from "format-string-by-pattern";
import { OnChange } from "react-final-form-listeners";
import { toastError } from "components/Toast/dialogs";
import { getEnderecoPorCEP } from "services/cep.service";

export const Loja = ({ loja, fields, index }) => {
  const [apiCEPfora, setApiCEPfora] = useState(false);

  return (
    <div key={loja}>
      <div className="row">
        <div className="col-12">
          <Field
            component={InputText}
            label="Nome Fantasia"
            name={`${loja}.nome_fantasia`}
            required
            validate={composeValidators(required)}
            placeholder="Digite o Nome Fantasia da loja"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 col-12">
          <Field
            component={InputText}
            parse={formatStringByPattern("12345-678")}
            label="CEP"
            name={`${loja}.cep`}
            required
            validate={composeValidators(required, validaCEP, validaRangeCEP)}
            placeholder="Digite o CEP"
          />
          <OnChange name={`${loja}.cep`}>
            {async (value, previous) => {
              if (value.length === 9) {
                const response = await getEnderecoPorCEP(value);
                if (response.status === HTTP_STATUS.OK) {
                  if (response.data.resultado === "0") {
                    toastError("CEP não encontrado");
                    fields.value[index].endereco = "";
                    fields.value[index].cidade = "";
                    fields.value[index].uf = "";
                  } else if (
                    response.data.uf !== "SP" ||
                    response.data.cidade !== "São Paulo"
                  ) {
                    toastError("CEP não é do município de São Paulo");
                    fields.value[index].endereco = "";
                  } else {
                    fields.value[index].endereco =
                      response.data.tipo_logradouro +
                      " " +
                      response.data.logradouro;
                    fields.value[index].cidade = response.data.cidade;
                    fields.value[index].uf = response.data.uf;
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
            label="Endereço"
            name={`${loja}.endereco`}
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
            name={`${loja}.numero`}
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
            name={`${loja}.complemento`}
            validate={somenteAlfanumericos}
            toUppercaseActive
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 col-12">
          <Field
            component={InputText}
            maxlength={255}
            label="UF"
            name={`${loja}.uf`}
            required
            validate={composeValidators(required, somenteAlfanumericos)}
            toUppercaseActive
            disabled
          />
        </div>
        <div className="col-sm-4 col-12">
          <Field
            component={InputText}
            maxlength={20}
            label="Cidade"
            name={`${loja}.cidade`}
            validate={somenteAlfanumericos}
            toUppercaseActive
            disabled
          />
        </div>
        <div className="col-sm-4 col-12 mt-auto mb-1">
          <Botao
            style={BUTTON_STYLE.BLUE_OUTLINE}
            texto="Remover"
            className="col-12"
            type={BUTTON_TYPE.BUTTON}
            icon={BUTTON_ICON.TRASH}
            onClick={() => fields.remove(index)}
            disabled={fields.length === 1}
          />
        </div>
      </div>
    </div>
  );
};
