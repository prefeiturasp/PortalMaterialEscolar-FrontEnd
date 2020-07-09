import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import arrayMutators from "final-form-arrays";
import { Tabs } from "./components/Tabs";
import { Cadastro } from "./components/Cadastro";
import { Arquivos } from "./components/Arquivos";
import { TabelaPrecos } from "./components/TabelaPrecos";
import "./style.scss";

export const CadastroFornecedor = () => {
  const [empresa, setEmpresa] = useState({
    id: 116,
    ofertas_de_uniformes: [
      {
        id: 580,
        uniforme_categoria: "MALHARIA",
        uniforme_quantidade: 5,
        criado_em: "2020-07-06T12:21:29.644714-03:00",
        alterado_em: "2020-07-06T12:21:29.644739-03:00",
        uuid: "d76551bf-62a0-4088-848d-ea9fb9bda680",
        preco: "1.00",
        proponente: 116,
        uniforme: 1,
      },
      {
        id: 581,
        uniforme_categoria: "MALHARIA",
        uniforme_quantidade: 1,
        criado_em: "2020-07-06T12:21:29.647847-03:00",
        alterado_em: "2020-07-06T12:21:29.647872-03:00",
        uuid: "634fc4d4-1301-4fb8-8693-41cc6c833e42",
        preco: "1.00",
        proponente: 116,
        uniforme: 2,
      },
      {
        id: 582,
        uniforme_categoria: "MALHARIA",
        uniforme_quantidade: 1,
        criado_em: "2020-07-06T12:21:29.649788-03:00",
        alterado_em: "2020-07-06T12:21:29.649812-03:00",
        uuid: "1c1ffda6-4aed-4df7-887a-220b4fed03a2",
        preco: "1.00",
        proponente: 116,
        uniforme: 3,
      },
      {
        id: 583,
        uniforme_categoria: "MALHARIA",
        uniforme_quantidade: 1,
        criado_em: "2020-07-06T12:21:29.651361-03:00",
        alterado_em: "2020-07-06T12:21:29.651384-03:00",
        uuid: "97bbb571-6dfa-4384-a7de-0f22bea8f3ee",
        preco: "1.00",
        proponente: 116,
        uniforme: 4,
      },
      {
        id: 584,
        uniforme_categoria: "MALHARIA",
        uniforme_quantidade: 1,
        criado_em: "2020-07-06T12:21:29.653220-03:00",
        alterado_em: "2020-07-06T12:21:29.653243-03:00",
        uuid: "343dc100-d0ef-4cbb-ae26-3846732c600a",
        preco: "1.00",
        proponente: 116,
        uniforme: 5,
      },
      {
        id: 585,
        uniforme_categoria: "MALHARIA",
        uniforme_quantidade: 5,
        criado_em: "2020-07-06T12:21:29.654862-03:00",
        alterado_em: "2020-07-06T12:21:29.654885-03:00",
        uuid: "93c50e93-c0b0-438b-8d72-0656a199ecab",
        preco: "1.00",
        proponente: 116,
        uniforme: 6,
      },
    ],
    lojas: [
      {
        id: 140,
        email: "teste@teste.com",
        criado_em: "2020-07-06T12:21:29.662995-03:00",
        alterado_em: "2020-07-06T12:32:13.629081-03:00",
        uuid: "2386c724-e230-4428-957f-e131964df0c9",
        nome_fantasia: "dsasd",
        cep: "08111-055",
        endereco: "Rua Pires",
        bairro: "Vila Itaim",
        numero: "123",
        complemento: null,
        latitude: null,
        longitude: null,
        numero_iptu: "",
        telefone: "(12) 3123-12312",
        foto_fachada: null,
        proponente: 116,
      },
    ],
    arquivos_anexos: [],
    criado_em: "2020-07-06T12:21:29.332598-03:00",
    alterado_em: "2020-07-06T12:21:29.332651-03:00",
    uuid: "553eeb44-0607-424d-a300-11ea8e415117",
    cnpj: "33.124.234/0001-08",
    razao_social: "asdasd",
    end_logradouro: "ashdhua",
    end_cidade: "hudauh",
    end_uf: "SP",
    end_cep: "09271-405",
    telefone: "(12) 13123-1313",
    email: "cal.v.in.ma.sters@gmail.com",
    responsavel: "dasiuh",
    status: "EM_PROCESSO",
  });
  const [tab, setTab] = useState("cadastro");
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const carregaEmpresa = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");
      if (uuid) {
        setTab("anexos");
        setUuid(uuid);
      }
    };
    carregaEmpresa();
  }, []);

  const onSubmit = async (values) => {
    setTab("tabela-precos");
  };

  return (
    <div className="cadastro-fornecedor">
      <PaginaComCabecalhoRodape>
        <div className="container">
          <h1>Cadastro de Fornecedor</h1>
          <Tabs uuid={uuid} tab={tab} setTab={setTab} />
          <Form
            onSubmit={onSubmit}
            mutators={{
              ...arrayMutators,
            }}
            initialValues={{
              apontador_check: false,
              lojas: [{ nome_fantasia: "", telefone: "" }],
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                {tab === "cadastro" && <Cadastro values={values} />}
                {tab === "tabela-precos" && (
                  <TabelaPrecos form={form} values={values} />
                )}
                {tab === "arquivos" && <Arquivos empresa={empresa} />}
              </form>
            )}
          />
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
