import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { getProponente } from "services/cadastro.service";
import { formataEmpresa } from "screens/CadastroFornecedor/helpers";
import { toastError } from "components/Toast/dialogs";
import { LoadingCircle } from "components/LoadingCircle";
import "./style.scss";
import { getStatus } from "helpers/helpers";

export const PaginaInicialFornecedor = () => {
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const carregaEmpresa = async () => {
      getProponente(localStorage.getItem("uuid")).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setEmpresa(formataEmpresa(response.data));
        } else {
          toastError("Erro ao carregar dados da empresa");
        }
      });
    };
    carregaEmpresa();
  }, []);

  return (
    <div className="pagina-inicial">
      <PaginaHeaderSidebar>
        {empresa ? (
          <div>
            <div className="card">
              <div className="card-body">
                <strong>Status: </strong>
                {getStatus(empresa.status)}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="card avisos">
                  <div className="card-body">
                    <h2>Avisos</h2>
                    {empresa.observacao || "Sem observações."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingCircle />
        )}
      </PaginaHeaderSidebar>
    </div>
  );
};
