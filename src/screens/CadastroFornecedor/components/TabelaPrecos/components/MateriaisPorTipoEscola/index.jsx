import React, { useState } from "react";
import "./style.scss";
import { TIPO_ESCOLA_MATERIAIS } from "./constants";
import { getTotal } from "./helpers";

export const MateriaisPorTipoEscola = ({ tipoEscola, values, className }) => {
  const [ativo, setAtivo] = useState(false);

  return (
    <div className={`materiais-por-tipo-escola ${className || undefined}`}>
      <div className="acordiao">
        <div className="row">
          <div className="col-6">
            {TIPO_ESCOLA_MATERIAIS[tipoEscola].label}{" "}
          </div>
          <div
            className={`col-1 ${
              TIPO_ESCOLA_MATERIAIS[tipoEscola].materiais.filter(
                (material) => values[material.value]
              ).length === TIPO_ESCOLA_MATERIAIS[tipoEscola].materiais.length &&
              "qtd-total"
            }`}
          >
            {`${
              TIPO_ESCOLA_MATERIAIS[tipoEscola].materiais.filter(
                (material) => values[material.value]
              ).length
            }/${TIPO_ESCOLA_MATERIAIS[tipoEscola].materiais.length}`}
          </div>
          <div className="col-5 valor-total text-right">
            Valor total: R${" "}
            {getTotal(TIPO_ESCOLA_MATERIAIS[tipoEscola].materiais, values)}{" "}
            <i
              onClick={() => setAtivo(!ativo)}
              className={`fa fa-chevron-${ativo ? "up" : "down"}`}
            ></i>
          </div>
        </div>
      </div>
      {ativo && (
        <div className="parte-expandida">
          <div className="title">
            Confira a lista de itens, suas respectivas quantidades e o valor
            final
            <hr />
          </div>
          <div className="row">
            {TIPO_ESCOLA_MATERIAIS[tipoEscola].materiais.map((material) => {
              return (
                <div className="col-6">
                  <div
                    className={`row material ${
                      !values[material.value] ? "disabled" : undefined
                    }`}
                  >
                    <div className="col-5">{material.label}</div>
                    <div className="col-5">
                      <label>
                        R${" "}
                        <input
                          type="number"
                          value={values[material.value]}
                          className="col-7"
                          disabled
                        />{" "}
                        x {material.quantidade.toString().padStart(2, "0")}
                      </label>
                    </div>
                    <div className="col-2 font-weight-bold text-right">
                      R${" "}
                      {values[material.value]
                        ? (
                            material.quantidade *
                            parseFloat(values[material.value])
                          )
                            .toFixed(2)
                            .toString()
                            .replace(".", ",")
                        : "0,00"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="subtitle pt-2">
            * Itens desabilitados não foram marcados na lista de materiais.
          </div>
        </div>
      )}
    </div>
  );
};
