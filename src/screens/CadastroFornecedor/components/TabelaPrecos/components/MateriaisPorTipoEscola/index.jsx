import React, { useState } from "react";
import { getTotal, getLabelTotalItens } from "./helpers";
import { getNameFromLabel } from "../../helpers";
import "./style.scss";

export const MateriaisPorTipoEscola = ({ kit, values, className }) => {
  const [ativo, setAtivo] = useState(false);

  return (
    <div className={`materiais-por-tipo-escola ${className || undefined}`}>
      <div className="acordiao">
        <div className="row">
          <div className="col-6">{kit.nome}</div>
          <div className="col-6 valor-total text-right">
            <span
              className={`mr-4 ${
                kit.materiais_do_kit.filter(
                  (materialKit) =>
                    values[getNameFromLabel(materialKit.material.nome)]
                ).length === kit.materiais_do_kit.length && "qtd-total"
              } ${
                kit.materiais_do_kit.filter(
                  (materialKit) =>
                    values[getNameFromLabel(materialKit.material.nome)]
                ).length !== 0 &&
                kit.materiais_do_kit.filter(
                  (materialKit) =>
                    values[getNameFromLabel(materialKit.material.nome)]
                ).length < kit.materiais_do_kit.length &&
                "qtd-parcial"
              }`}
            >
              {`${
                kit.materiais_do_kit.filter(
                  (materialKit) =>
                    values[getNameFromLabel(materialKit.material.nome)]
                ).length
              }/${kit.materiais_do_kit.length} ${getLabelTotalItens(
                kit.materiais_do_kit.filter(
                  (materialKit) =>
                    values[getNameFromLabel(materialKit.material.nome)]
                ).length,
                kit.materiais_do_kit.length
              )}`}
            </span>
            Valor total: R$ {getTotal(kit.materiais_do_kit, values)}{" "}
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
            {kit.materiais_do_kit.map((materialKit) => {
              return (
                <div className="col-6">
                  <div
                    className={`row material ${
                      !values[getNameFromLabel(materialKit.material.nome)]
                        ? "disabled"
                        : undefined
                    }`}
                  >
                    <div className="col-5">{materialKit.material.nome}</div>
                    <div className="col-5">
                      <label>
                        R${" "}
                        <input
                          value={
                            values[getNameFromLabel(materialKit.material.nome)]
                          }
                          className="col-7"
                          disabled
                        />{" "}
                        x {materialKit.unidades.toString().padStart(2, "0")}
                      </label>
                    </div>
                    <div className="col-2 font-weight-bold text-right">
                      R${" "}
                      {values[getNameFromLabel(materialKit.material.nome)]
                        ? (
                            materialKit.unidades *
                            parseFloat(
                              values[
                                getNameFromLabel(materialKit.material.nome)
                              ].replace(",", ".")
                            )
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
