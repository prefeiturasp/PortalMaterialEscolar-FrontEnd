import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form } from "react-final-form";
import { getProponente } from "services/cadastro.service";
import { formataEmpresa } from "screens/CadastroFornecedor/helpers";
import { toastError } from "components/Toast/dialogs";
import { TabelaPrecos as TabelaPrecosComponente } from "screens/CadastroFornecedor/components/TabelaPrecos";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import "./style.scss";

export const TabelaPrecosLogado = () => {
  const [empresa, setEmpresa] = useState(null);

  const onSubmit = (values) => {
    console.log(values);
  };

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
    <div className="tabela-precos-logado">
      <PaginaHeaderSidebar>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            ...empresa,
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <TabelaPrecosComponente
                form={form}
                empresa={empresa}
                setEmpresa={setEmpresa}
                values={values}
                uuid={localStorage.getItem("uuid")}
                logado={true}
              />
            </form>
          )}
        />
      </PaginaHeaderSidebar>
    </div>
  );
};
