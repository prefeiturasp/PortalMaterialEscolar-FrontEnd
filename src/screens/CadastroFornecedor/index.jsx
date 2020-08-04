import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form } from "react-final-form";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import arrayMutators from "final-form-arrays";
import { Tabs } from "./components/Tabs";
import { Cadastro } from "./components/Cadastro";
import { Arquivos } from "./components/Arquivos";
import { TabelaPrecos } from "./components/TabelaPrecos";
import {
  cadastroFornecedorStep1,
  getProponente,
} from "services/cadastro.service";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import {
  formatarPayloadCadastro,
  formataEmpresa,
  validarCadastro,
} from "./helpers";
import { getError } from "helpers/helpers";
import { API_URL } from "config";
import { getEdital } from "services/homeFornecedor.service";
import "./style.scss";

export const CadastroFornecedor = () => {
  const [empresa, setEmpresa] = useState(null);
  const [tab, setTab] = useState("cadastro");
  const [uuid, setUuid] = useState(null);
  const [erroAPI, setErroAPI] = useState(false);
  const [edital, setEdital] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const carregaEmpresa = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");
      if (uuid) {
        getProponente(uuid).then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            setEmpresa(formataEmpresa(response.data));
            setTab("tabela-precos");
            setUuid(uuid);
          } else {
            setErroAPI(true);
          }
        });
      }
    };
    const carregaEdital = async () => {
      getEdital().then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setEdital(API_URL.replace("api", "") + response.data);
        }
      });
    };
    carregaEmpresa();
    carregaEdital();
  }, []);

  const onSubmit = async (values) => {
    const erro = validarCadastro(values);
    if (erro) {
      toastError(erro);
    } else {
      const response = await cadastroFornecedorStep1(
        formatarPayloadCadastro(values)
      );
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Cadastro enviado com sucesso!");
        window.location.search += `?uuid=${response.data.uuid}`;
      } else {
        toastError(getError(response.data));
      }
    }
  };

  return (
    <div className="cadastro-fornecedor">
      <PaginaComCabecalhoRodape>
        <div className="container">
          {!erroAPI && (
            <div>
              <h1>Cadastro de Fornecedor</h1>
              <Tabs uuid={uuid} tab={tab} setTab={setTab} />
              <Form
                onSubmit={onSubmit}
                mutators={{
                  ...arrayMutators,
                }}
                initialValues={{
                  ...empresa,
                  marcar_todos: false,
                  lojas: empresa
                    ? empresa.lojas
                    : [
                        {
                          nome_fantasia: "",
                          telefone: "",
                        },
                      ],
                }}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    {tab === "cadastro" && (
                      <Cadastro
                        values={values}
                        empresa={empresa}
                        form={form}
                        edital={edital}
                      />
                    )}
                    {tab === "tabela-precos" && (
                      <TabelaPrecos
                        form={form}
                        empresa={empresa}
                        setEmpresa={setEmpresa}
                        values={values}
                        uuid={uuid}
                        setTab={setTab}
                      />
                    )}
                    {tab === "arquivos" && (
                      <Arquivos empresa={empresa} setEmpresa={setEmpresa} />
                    )}
                  </form>
                )}
              />
            </div>
          )}
          {erroAPI && <div>Erro ao carregar dados da empresa.</div>}
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
