import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import { required } from "helpers/validators";
import { KitMaterialEscolar } from "components/KitMaterialEscolar";
import { AutoComplete } from "components/Input/AutoComplete";
import imgMateriais from "assets/img/materiais.svg";
import { toastWarn } from "components/Toast/dialogs";
import { useHistory } from "react-router-dom";
import Select from "components/Select";
import Botao from "components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "components/Botao/constants";
import { getKits } from "services/kits.service";
import { LoadingCircle } from "components/LoadingCircle";
import { Modal, Button } from "react-bootstrap";
import "./style.scss";

export const PortalFamilia = () => {
  const [kits, setKits] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  useEffect(() => {
    getKits().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setKits(response.data);
      }
    });
  }, []);

  const consultarEndereco = (values) => {
    if (!latitude || !longitude) {
      toastWarn("Selecione um dos resultados de endereço para buscar");
    } else if (!values.kit) {
      toastWarn("Selecione um kit");
    } else {
      history.push({
        pathname: "/mapa-de-fornecedores",
        state: {
          latitude: latitude,
          longitude: longitude,
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
                    <div className="field-endereco col-sm-4 offset-sm-2 col-12">
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
                    {kits ? (
                      <div className="col-sm-4 col-12">
                        <Field
                          component={Select}
                          labelClassName="multiselect"
                          name="kit"
                          label="Selecione etapa de ensino"
                          options={kits.filter((kit) => kit.ativo)}
                          validate={required}
                          naoDesabilitarPrimeiraOpcao
                        />
                      </div>
                    ) : (
                      <LoadingCircle />
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
                <button
                  size="lg"
                  className="btn btn-light pl-4 pr-4"
                >
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
