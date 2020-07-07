import React from "react";
import { Field } from "react-final-form";
import "./style.scss";

export const ProdutoPreco = ({ values, name, label }) => {
  return (
    <div className="row produto-preco">
      <label className="produto col-sm-6 col-12 my-auto">
        <Field name={`${name}_check`} component="input" type="checkbox" />{" "}
        {label}
      </label>
      <label className="preco col-sm-6 col-12 my-auto">
        R$
        <Field
          name={name}
          component="input"
          type="text"
          disabled={!values[`${name}_check`]}
        />{" "}
      </label>
    </div>
  );
};
