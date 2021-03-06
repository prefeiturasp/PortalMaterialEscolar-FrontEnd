import React, { useState } from "react";
import { getTotal, getLabelTotalItens } from "./helpers";
import { getNameFromLabel } from "../../helpers";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import "./style.scss";

export const MateriaisPorTipoEscola = ({ kit, values, className }) => {
  const [ativo, setAtivo] = useState(false);

  return (
    <div className={`materiais-por-tipo-escola ${className || undefined}`}>
      <div className="acordiao">
        <div className="row">
          <div className="col-sm-6 col-12">
            <Field component="input" type="checkbox" name={kit.uuid} />
            <OnChange name={kit.uuid}>
              {async (value, previous) => {
                setAtivo(value);
              }}
            </OnChange>
            <span className="ml-2">{kit.nome}</span>
          </div>
          {values[kit.uuid] && (
            <div className="col-sm-6 col-12 valor-total">
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
              <div className="get-total">
                Valor total: R$ {getTotal(kit.materiais_do_kit, values)}{" "}
                {values[kit.uuid] && (
                  <i
                    onClick={() => setAtivo(!ativo)}
                    className={`fa fa-chevron-${ativo ? "up" : "down"}`}
                  ></i>
                )}
                {parseFloat(
                  getTotal(kit.materiais_do_kit, values).replace(",", ".")
                ) > parseFloat(kit.preco_maximo) && (
                  <div className="text-warning">
                    Valor máximo do kit: R$ {kit.preco_maximo.replace(".", ",")}
                  </div>
                )}
              </div>
            </div>
          )}
          {!values[kit.uuid] && (
            <i
              onClick={() => setAtivo(!ativo)}
              className={`col-sm-6 col-12 text-right fa fa-chevron-${
                ativo ? "up" : "down"
              }`}
            ></i>
          )}
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
                <div className="col-sm-6 col-12">
                    <div className={`row material ${
                      !values[kit.uuid] ? "disabled" : undefined
                    }`}
                    >
                    <div className="col-sm-5 col-12">
                      {materialKit.material.nome}
                    </div>
                    <div className="col-sm-5 col-9">
                      <label>
                        R${" "}
                        <Field
                          component="input"
                          name={getNameFromLabel(materialKit.material.nome)}
                          className="col-7"
                          disabled={!values[kit.uuid]}
                        />{" "}
                        x {materialKit.unidades.toString().padStart(2, "0")}
                      </label>
                    </div>
                    <div className="col-sm-2 col-3 font-weight-bold text-right">
                      R${" "}
                      {values[getNameFromLabel(materialKit.material.nome)] &&
                      !isNaN(
                        values[
                          getNameFromLabel(materialKit.material.nome)
                        ].replace(",", ".")
                      )
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
            * É obrigatório o fornecimento do kit completo.
          </div>
        </div>
      )}
    </div>
  );
};
