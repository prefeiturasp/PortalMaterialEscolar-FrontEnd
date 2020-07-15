import React from "react";
import { Field } from "react-final-form";
import {
  naoPodeMaiorQue10,
  composeValidators,
  somenteValoresPositivos,
} from "helpers/validators";
import { InputText } from "components/Input/InputText";
import "./style.scss";

export const ProdutoPreco = ({ form, values, name, label }) => {
  return (
    <div className="row produto-preco">
      <label className="produto col-sm-6 col-12 my-auto">
        <Field
          onClick={() => {
            form.change(
              name,
              values[`${name}_check`] ? undefined : values[name]
            );
          }}
          name={`${name}_check`}
          checked={values[`${name}_check`]}
          component="input"
          type="checkbox"
        />{" "}
        {label}
      </label>
      <label className="preco col-sm-6 col-12 my-auto">
        R$
        <Field
          name={name}
          component={InputText}
          type="number"
          min={0}
          className="col-10"
          validate={composeValidators(
            naoPodeMaiorQue10,
            somenteValoresPositivos
          )}
          disabled={!values[`${name}_check`]}
        />
      </label>
    </div>
  );
};
