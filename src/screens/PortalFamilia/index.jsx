import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import { required } from "helpers/validators";
import { KitMaterialEscolar } from "components/KitMaterialEscolar";
import { AutoComplete } from "components/Input/AutoComplete";
import imgMateriais from "assets/img/materiais.svg";
import { getMateriais } from "services/tabelaPrecos.service";
import { formatarParaMultiselect } from "helpers/helpers";
import { toastWarn } from "components/Toast/dialogs";
import { useHistory } from "react-router-dom";
import "./style.scss";
import Select from "components/Select";
import { OPCOES_MATERIAIS, KITS } from "./constants";
import Botao from "components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "components/Botao/constants";

export const PortalFamilia = () => {
  const [kits, setKits] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [materiaisSelecionados, setMateriaisSelecionados] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [endereco, setEndereco] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getMateriais().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setMateriais(formatarParaMultiselect(response.data));
      }
    });
  }, []);

  const consultarEndereco = (values) => {
    if (!latitude || !longitude) {
      toastWarn("Selecione um dos resultados de endereço para buscar");
    } else if (
      values.tipo_busca === "itens" &&
      materiaisSelecionados.length === 0
    ) {
      toastWarn("Selecione ao menos um material escolar");
    } else {
      history.push({
        pathname: "/mapa-de-fornecedores",
        state: {
          latitude: latitude,
          longitude: longitude,
          materiaisSelecionados: materiaisSelecionados,
          endereco: endereco.split(",")[0],
        },
      });
    }
  };

  const handleAddressChange = (values) => {
    setLatitude(values.latitude);
    setLongitude(values.longitude);
    setEndereco(values.endereco);
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <PaginaComCabecalhoRodape>
        <div className="busca-mapa">
          <div className="title">
            Encontre a loja credenciada mais próxima de você
          </div>
          <div className="subtitle">
            Para encontrar as lojas fornecedoras dos uniformes mais próximas a
            você, basta informar <br /> abaixo seu endereço e quais itens do
            uniforme você procura.
          </div>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form>
                <div className="container">
                  <div className="row pt-5">
                    <div className="field-endereco col-sm-12 col-md-4">
                      <Field
                        component={AutoComplete}
                        label="Escreva o logradouro e número que você quer consultar *"
                        name="endereco.endereco"
                        required
                        validate={required}
                        esconderAsterisco
                        handleChange={handleAddressChange}
                      />
                    </div>
                    <div className="col-md-4 col-12">
                      <Field
                        component={Select}
                        labelClassName="multiselect"
                        name="tipo_busca"
                        label="Busque kit completo ou itens avulsos*"
                        options={OPCOES_MATERIAIS}
                        validate={required}
                        naoDesabilitarPrimeiraOpcao
                      />
                    </div>
                    {values.tipo_busca === "itens" && (
                      <div className="field-uniforme col-sm-12 col-md-4">
                        <label
                          htmlFor={"tipo_uniforme"}
                          className={`multiselect`}
                        >
                          Selecione etapa de ensino ou materiais escolares
                        </label>
                        <Field
                          component={StatefulMultiSelect}
                          name="material_escolar"
                          selected={materiaisSelecionados}
                          options={materiais}
                          onSelectedChanged={(values) =>
                            setMateriaisSelecionados(values)
                          }
                          disableSearch={true}
                          overrideStrings={{
                            selectSomeItems: "Selecione",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos",
                          }}
                        />
                      </div>
                    )}
                    {values.tipo_busca !== "itens" && (
                      <div className="col-md-4 col-12">
                        <Field
                          component={Select}
                          labelClassName="multiselect"
                          name="kit"
                          label="Selecione etapa de ensino ou materiais escolares"
                          options={KITS}
                          validate={required}
                          naoDesabilitarPrimeiraOpcao
                          disabled={
                            !values.tipo_busca ||
                            values.tipo_busca === "Selecione"
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="btn-consultar text-center">
                    <button
                      size="lg"
                      type="button"
                      className="btn btn-light col-sm-3 col-12"
                      onClick={() => consultarEndereco(values)}
                    >
                      <strong>Consultar</strong>
                    </button>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
        <div id="conteudo" className="w-100 home">
          <div className="container">
            <div className="row mt-5">
              <div className="col-12">
                <h2 className="cor-azul mb-4">
                  Como funciona o novo modelo de fornecimento de material
                  escolar?
                </h2>
                <div className="justify-content-lg-end justify-content-center">
                  A Prefeitura disponibiliza o crédito para que as famílias
                  realizem a compra diretamente nas lojas credenciadas. Isso
                  torna a aquisição do material escolar mais rápida, atendendo
                  critérios de qualidade e as preferências dos estudantes e
                  famílias, respeitando a lista de itens necessários para cada
                  etapa. Por exemplo: se a criança já possui a tesoura do ano
                  anterior em bom estado, não precisa comprar outra e pode
                  gastar o valor para escolher um determinado modelo de um item
                  do seu kit que mais a agrade.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 cidade-precisa">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6 col-sm-12 mb-lg-0">
                <h2 className="cor-azul mb-4">
                  Quais itens compõem os kits de materiais escolares da rede
                  municipal de ensino?
                </h2>
                <KitMaterialEscolar tipoEscola="bercario" />
                <KitMaterialEscolar tipoEscola="mini_grupo" />
                <KitMaterialEscolar tipoEscola="educacao_infantil" />
                <KitMaterialEscolar tipoEscola="ensino_fundamental_alfabetizacao" />
                <KitMaterialEscolar tipoEscola="ensino_fundamental_interdisciplinar" />
                <KitMaterialEscolar tipoEscola="ensino_fundamental_autoral" />
                <KitMaterialEscolar tipoEscola="ensino_medio_eja_mova" />
              </div>
              <div className="col-lg-6 col-sm-12">
                <img
                  src={imgMateriais}
                  alt="Peças do uniforme escolar"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 container agora-cada-bloco">
          É importante lembrar que, embora a decisão de comprar ou não todos os
          itens de um determinado kit seja das famílias, o(a) estudante precisa
          levar para a escola todos os itens que compõem o kit de sua faixa
          etária. Isso porque esses materiais são essenciais para o trabalho
          pedagógico que será desenvolvido ao longo do ano letivo, ou seja, para
          realização de todas as atividades que contribuem para a aprendizagem.
        </div>
        <div className="container mt-3">
          <h2 className="cor-azul mb-4">
            Problemas na compra do material escolar?
          </h2>
          <div className="justify-content-lg-end justify-content-center">
            Em caso de problemas como possíveis falhas na confecção das peças,
            entre em contato com a loja onde produto foi adquirido. Para
            situações sem solução direta com o lojista, informe à Prefeitura nos
            Canais de Atendimento do SP 156 ou recorra a qualquer órgão de
            defesa do consumidor.
          </div>
          <div className="text-center pt-3 pb-3">
            <a href="https://sp156.prefeitura.sp.gov.br/portal/servicos/informacao?servico=3616">
              <Botao
                texto="Avise sobre problemas"
                className="col-sm-3 col-12 fs-16"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE}
              />
            </a>
          </div>
        </div>
        <div className="w-100 perguntas-frequentes text-center mt-5">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="mb-4">
                Ainda com dúvidas? Veja lista com perguntas frequentes
              </h3>
              <a
                className="mb-0"
                href="https://pedido-uniforme.sme.prefeitura.sp.gov.br"
              >
                <button size="lg" className="btn btn-light pl-4 pr-4">
                  <strong>Perguntas frequentes</strong>
                </button>
              </a>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
