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
import Select from "components/Select";
import { OPCOES_MATERIAIS } from "./constants";
import Botao from "components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "components/Botao/constants";
import { getKits } from "services/kits.service";
import { LoadingCircle } from "components/LoadingCircle";
import { BannerConsultaCadastro } from 'components/BannerConsultaCadastro'
import { Modal, Button } from "react-bootstrap";
import {
  getEspecificacoes,
} from "services/homeFamilia.service";
import { API_URL } from "config";
import "./style.scss";

export const PortalFamilia = () => {
  const [kits, setKits] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [materiaisSelecionados, setMateriaisSelecionados] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [show, setShow] = useState(false);
  const [especificacoesItens, setEspecificacoesItens] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  useEffect(() => {
    getKits().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setKits(response.data);
      }
    });
    getMateriais().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setMateriais(formatarParaMultiselect(response.data));
      }
    });
    getEspecificacoes().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setEspecificacoesItens(API_URL.replace("api", "") + response.data);
      }
    });
  }, []);

  const consultarEndereco = (values) => {
    if (!latitude || !longitude) {
      toastWarn("Selecione um dos resultados de endereço para buscar");
    } else if (values.tipo_busca === 'kits' &&
      values.kit.length === 0) {
      toastWarn("Selecione um kit");
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
          tipoBusca: values.tipo_busca,
          kit: values.kit,
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
        <BannerConsultaCadastro />
        <div className="busca-mapa">
          <div className="title">
            Encontre a loja credenciada mais próxima de você
          </div>
          <div className="subtitle">
            Para encontrar as lojas fornecedoras do material escolar mais
            próximas a você, basta informar <br /> abaixo seu endereço e quais
            itens ou kits completos do material escolar você procura.
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
                          Selecione materiais escolares
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
                    {values.tipo_busca == "kits" && kits && (
                      <div className="col-sm-4 col-12">
                        <Field
                          component={Select}
                          labelClassName="multiselect"
                          name="kit"
                          label="Selecione etapa de ensino"
                          options={kits.filter((kit) => kit.ativo)}
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
        <div id="conteudo" className="w-100 home-familia">
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
                  etapa.
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
                {kits ? (
                  kits
                    .filter((kit) => kit.ativo)
                    .map((kit) => {
                      return <KitMaterialEscolar kit={kit} />;
                    })
                ) : (
                  <div>Carregando kits...</div>
                )}
                <div className="mt-4">
                  <span className="especificacoes"><strong>ESPECIFICAÇÕES DOS ITENS </strong></span>
                  <a
                      className="especificacoes"
                      href={especificacoesItens}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>(acesse aqui)</strong>
                    </a>
                </div>
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
        <div className="container">
          <div className="row mt-4">
          <div className="col-lg-6">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Vídeo sobre o Portal do Material Escolar"
                  src="https://www.youtube.com/embed/K8uOAEAKR68"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
            </div>
          </div>
          <div className="col-lg-6 mb-lg-0">
          <h2 className="cor-azul mb-4">Ajude a Prefeitura a garantir a qualidade do material escolar</h2>
            <div className="justify-content-lg-end justify-content-center">
              As lojas credenciadas para a venda do material escolar 
              precisam atender as especificações técnicas estabelecidas
              pela Secretaria Municipal de Educação. Assista o vídeo ao 
              lado e saiba o que observar no momento da compra, para adquirir
              itens de qualidade.
            </div>
          </div>
          </div>
        </div>
        <div className="container mt-3">
          <h2 className="cor-azul mb-4">
            Problemas na compra do material escolar?
          </h2>
          <div className="justify-content-lg-end justify-content-center">
            Em caso de problemas como possíveis falhas nos produtos,
            entre em contato com a loja onde produto foi adquirido. Para
            situações sem solução direta com o lojista, informe à Prefeitura nos
            Canais de Atendimento do SP 156 ou recorra a qualquer órgão de
            defesa do consumidor.
          </div>
          <div className="text-center pt-3 pb-3">
            <a href="https://sp156.prefeitura.sp.gov.br/portal/servicos/informacao?t=666&a=710&servico=3798">
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
              <a href="https://educacao.sme.prefeitura.sp.gov.br/duvidas-frequentes-das-familias-sobre-o-material-escolar/">
                <button size="lg" className="btn btn-light pl-4 pr-4">
                  <strong>Perguntas frequentes</strong>
                </button>
              </a>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  Em breve a lista de perguntas frequentes estará disponível
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Fechar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
