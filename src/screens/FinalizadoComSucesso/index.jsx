import React from "react";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import "./style.scss";

export const FinalizadoComSucesso = (props) => {
  return (
    <PaginaComCabecalhoRodape>
      <div className="row">
        <div className="col-6 offset-3">
          <div className="finalizado-box d-flex justify-content-center p-5">
            <div className="text-weight-bold">
              <strong>
                <p className="title">Recebemos sua inscrição.</p>
              </strong>
              <p>
                A área técnica da Secretaria Municipal de Educação analisará o
                seu cadastro e enviará parecer por email.{" "}
              </p>
              <p>Favor aguardar nosso contato.</p>
            </div>
          </div>
        </div>
      </div>
    </PaginaComCabecalhoRodape>
  );
};
