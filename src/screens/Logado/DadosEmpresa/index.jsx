import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { Cadastro } from "../../CadastroFornecedor/components/Cadastro";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { getProponente, atualizaLojas } from "services/cadastro.service";
import { formataEmpresa } from "screens/CadastroFornecedor/helpers";
import { toastError, toastSuccess } from "components/Toast/dialogs";
import "./style.scss";

export const DadosEmpresa = () => {
  const [empresa, setEmpresa] = useState(null);

  const onSubmit = (values) => {
    atualizaLojas(localStorage.getItem("uuid"), values).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Loja(s) atualizada(s) com sucesso");
      }
    });
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
    <div className="dados-empresa-logado">
      <PaginaHeaderSidebar>
        <Form
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
          initialValues={{
            ...empresa,
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              {" "}
              <Cadastro values={values} empresa={empresa} form={form} />
            </form>
          )}
        />
      </PaginaHeaderSidebar>
    </div>
  );
};
