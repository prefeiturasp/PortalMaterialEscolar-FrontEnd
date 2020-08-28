import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import { getLojasCredenciadasSemLatLong } from "services/mapaFornecedores.service";
import "./style.scss";
import { LoadingCircle } from "components/LoadingCircle";

export const LojasCredenciadas = () => {
  const [lojas, setLojas] = useState(null);
  const [erroAPI, setErroAPI] = useState(false);

  useEffect(() => {
    getLojasCredenciadasSemLatLong()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setLojas(response.data);
        } else {
          setErroAPI(true);
        }
      })
      .catch(() => {
        setErroAPI(true);
      });
  }, []);

  return (
    <PaginaComCabecalhoRodape>
      <div className="lojas-credenciadas">
        <div className="container">
          <h1>Lojas credenciadas</h1>
          {!lojas && !erroAPI && <LoadingCircle />}
          <div className="card mb-5">
            <div className="card-body">
              {(erroAPI || (lojas && lojas.length === 0)) && (
                <div>
                  Os estabelecimentos estão em fase de realização cadastro, para
                  posterior análise. Em breve estarão disponíveis para acesso
                  neste portal.
                </div>
              )}
              {lojas &&
                lojas.map((loja) => {
                  return (
                    <div className="loja-dados">
                      <div className="row">
                        <div className="col-sm-8 col-12">
                          <div className="nome-loja font-weight-bold">
                            {loja.nome_fantasia}
                          </div>
                          <div>
                            <span className="font-weight-bold">
                              Nome do responsável:
                            </span>
                            {loja.responsavel}
                          </div>
                          <div>
                            <span className="font-weight-bold">E-mail: </span>
                            {loja.email}
                          </div>
                          <div>
                            <span className="font-weight-bold">Telefone: </span>
                            {loja.telefone}
                          </div>
                        </div>
                        {loja.foto_fachada && (
                          <div className="col-sm-4 col-12 text-right">
                            <img
                              src={loja.foto_fachada}
                              alt={`loja ${loja.nome_fantasia}`}
                            />
                          </div>
                        )}
                      </div>
                      <hr />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </PaginaComCabecalhoRodape>
  );
};
