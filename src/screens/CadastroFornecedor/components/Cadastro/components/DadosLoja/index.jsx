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
  validaTelefoneOuCelular,
} from "helpers/validators";
import formatStringByPattern from "format-string-by-pattern";
import { OnChange } from "react-final-form-listeners";
import { toastError } from "components/Toast/dialogs";
import { getEnderecoPorCEP } from "services/cep.service";
import formatString from "format-string-by-pattern";

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
        <div className="col-sm-6 col-12">
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
                    fields.value[index].bairro = "";
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
                    fields.value[index].bairro = response.data.bairro;
                  }
                } else {
                  setApiCEPfora(true);
                }
              }
            }}
          </OnChange>
        </div>
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            label="Bairro"
            name={`${loja}.bairro`}
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
            name={`${loja}.endereco`}
            required
            validate={required}
            disabled={!apiCEPfora}
          />
        </div>
        <div className="col-sm-2 col-12">
          <Field
            component={InputText}
            maxlength={255}
            label="Número"
            name={`${loja}.numero`}
            required
            validate={composeValidators(required)}
          />
        </div>
        <div className="col-sm-4 col-12">
          <Field
            component={InputText}
            maxlength={20}
            label="Complemento"
            name={`${loja}.complemento`}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            maxlength={20}
            label="Cidade"
            name={`${loja}.cidade`}
            disabled
          />
        </div>
        <div className="col-sm-2 col-12">
          <Field
            component={InputText}
            maxlength={255}
            label="UF"
            name={`${loja}.uf`}
            required
            validate={composeValidators(required)}
            disabled
          />
        </div>
        <div className="col-sm-4 col-12">
          <Field
            component={InputText}
            placeholder={"Telefone do responsável"}
            label="Telefone do responsável"
            parse={
              fields.value[index].telefone &&
              fields.value[index].telefone.length + 1 <= 14
                ? formatString("(99) 9999-9999")
                : formatString("(99) 99999-9999")
            }
            name={`${loja}.telefone`}
            required
            type="text"
            validate={composeValidators(required, validaTelefoneOuCelular)}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12 text-right">
          <Botao
            style={BUTTON_STYLE.BLUE_OUTLINE}
            texto="Remover"
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
