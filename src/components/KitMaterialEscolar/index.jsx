import React, { useState } from "react";
import { TIPO_ESCOLA_MATERIAIS } from "screens/CadastroFornecedor/components/TabelaPrecos/components/MateriaisPorTipoEscola/constants";
import "./style.scss";

export const KitMaterialEscolar = ({ tipoEscola }) => {
  const [ativo, setAtivo] = useState(false);

  return (
    <div className="kit-material-escolar">
      <div className="acordiao">
        <div className="row">
          <div className="col-11">
            {TIPO_ESCOLA_MATERIAIS[tipoEscola].label}
          </div>
          <div className="col-1 valor-total text-right">
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
            Itens previstos no kit:
            <hr />
          </div>
          {TIPO_ESCOLA_MATERIAIS[tipoEscola].materiais.map((material) => {
            return (
              <div className="material">
                {material.label} -{" "}
                {material.quantidade.toString().padStart(2, "0")} unidade
                {material.quantidade > 1 && "s"}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
