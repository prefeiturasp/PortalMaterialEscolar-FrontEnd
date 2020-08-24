import React from "react";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import "./style.scss";

export const FinalizadoComSucesso = (props) => {
  return (
    <PaginaComCabecalhoRodape>
      <div className="row">
        <div className="col-sm-6 col-10 offset-sm-3 offset-1">
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
