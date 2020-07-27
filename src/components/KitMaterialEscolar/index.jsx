import React, { useState } from "react";
import "./style.scss";

export const KitMaterialEscolar = ({ kit }) => {
  const [ativo, setAtivo] = useState(false);

  return (
    <div className="kit-material-escolar">
      <div className="acordiao">
        <div className="row">
          <div className="col-11">{kit.nome}</div>
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
          {kit.materiais_do_kit.map((material) => {
            return (
              <div className="material">
                {material.material.nome} -{" "}
                {material.unidades.toString().padStart(2, "0")} unidade
                {material.unidades > 1 && "s"}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
