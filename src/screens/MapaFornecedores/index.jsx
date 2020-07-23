import React, { Fragment, useState, useEffect, useCallback } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import { LoadingCircle } from "components/LoadingCircle";
import { AutoComplete } from "components/Input/AutoComplete";
import { required } from "helpers/validators";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { getLojasCredenciadas } from "services/mapaFornecedores.service";
import {
  sortByParam,
  acrescentaTotalMateriais,
  getArrayMateriais,
} from "./helpers";
import Select from "components/Select";
import { ORDENAR_OPCOES } from "./constants";
import { QUANTIDADE_POR_PAGINA } from "components/Paginacao/constants";
import { Paginacao } from "components/Paginacao";
import Mapa from "components/Mapa";
import { getMateriais } from "services/tabelaPrecos.service";
import { formatarParaMultiselect } from "helpers/helpers";
import { KITS, OPCOES_MATERIAIS } from "../PortalFamilia/constants";
import "./style.scss";
import { toastWarn } from "components/Toast/dialogs";

export const MapaFornecedores = (props) => {
  const [lojas, setLojas] = useState(null);
  const [materiais, setMateriais] = useState(null);
  const [consultarNovamente, setConsultarNovamente] = useState(false);
  const [endereco, setEndereco] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [lojaHover, setLojaHover] = useState(null);
  const [materiaisState, setMateriaisState] = useState([]);
  const [tipoBusca, setTipoBusca] = useState(null);
  const [kit, setKit] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (props.location && props.location.state) {
      const {
        latitude,
        longitude,
        materiaisSelecionados,
        endereco,
        tipoBusca,
        kit,
      } = props.location.state;
      getLojasCredenciadas(latitude, longitude, {
        tipo_busca: tipoBusca,
        kit: kit,
      }).then((response) => {
        setLatitude(latitude);
        setLongitude(longitude);
        setMateriaisState(materiaisSelecionados);
        setEndereco(endereco);
        setTipoBusca(tipoBusca);
        setKit(kit);
        setLojas(
          acrescentaTotalMateriais(
            sortByParam(response.data, "distancia"),
            materiaisSelecionados,
            kit
          )
        );
      });
      getMateriais().then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setMateriais(formatarParaMultiselect(response.data));
        }
      });
    }
  }, []);

  const handleAddressChange = (values) => {
    setLatitude(values.latitude);
    setLongitude(values.longitude);
    setEndereco(values.endereco);
  };

  const onSelectChanged = (value) => {
    setLojas(sortByParam(lojas, value));
  };

  const getLojasNovoEndereco = (form, values) => {
    if (values.tipo_busca === "kits" && !values.kit) {
      toastWarn("Selecione um kit");
    } else if (values.tipo_busca === "itens" && materiaisState.length === 0) {
      toastWarn("Selecione ao menos um material escolar");
    } else {
      form.change("endereco", "");
      setKit(values.kit);
      setTipoBusca(values.tipo_busca);
      setConsultarNovamente(false);
      setLojas(null);
      setPagina(1);
      getLojasCredenciadas(latitude, longitude).then((response) => {
        setLojas(
          acrescentaTotalMateriais(
            sortByParam(response.data, "distancia"),
            materiaisState,
            values.kit
          )
        );
      });
    }
  };

  const useForceUpdate = () => {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  };

  const forceUpdate = useForceUpdate();

  const collapseLoja = (id) => {
    lojas.forEach((loja) => {
      if (loja.id !== id) loja.ativo = false;
    });
    lojas.find((loja) => loja.id === id).ativo = !lojas.find(
      (loja) => loja.id === id
    ).ativo;
    setLojas(lojas);
    forceUpdate();
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <PaginaComCabecalhoRodape>
      <div>
        <div className={`w-100 lojas-mais-proximas mt-5 ${!lojas && "opaco"}`}>
          <div className="container">
            <div className="col-lg-12 d-flex mb-lg-0">
              <h3 className="text-white">Lojas mais próximas</h3>
              <button
                size="lg"
                disabled={!lojas}
                className="btn btn-outline-primary pl-4 pr-4"
                onClick={() => history.goBack()}
              >
                <strong>voltar</strong>
              </button>
            </div>
          </div>
        </div>
        {!lojas && <LoadingCircle />}
        <div className={`w-100 bg-white h-100 ${!lojas && "opaco"}`}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <div className="container">
                <div className="row">
                  {!lojas && (
                    <div className="col-lg-6 col-sm-12 lojas">
                      Carregando lojas...
                    </div>
                  )}
                  {lojas && lojas.length === 0 && !consultarNovamente && (
                    <div className="text-dark col-lg-6 col-sm-12 lojas">
                      Infelizmente <strong>não há lojas</strong> credenciadas
                      para fornecimento do material escolar próximas da{" "}
                      {endereco}.
                      <div className="pt-3 text-center">
                        <button
                          size="lg"
                          disabled={!lojas}
                          className="btn btn-outline-primary pl-4 pr-4"
                          onClick={() => setConsultarNovamente(true)}
                        >
                          <strong>Consultar novamente</strong>
                        </button>
                      </div>
                    </div>
                  )}
                  {consultarNovamente && (
                    <div className="col-lg-6 col-sm-12 lojas">
                      <div className="text-dark pt-4">
                        Para encontrar as lojas fornecedoras de materiais
                        escolares mais próximas a você, basta informar abaixo
                        seu endereço e qual kit ou quais materiais escolares
                        você procura.
                      </div>
                      <form>
                        <div className="row pt-5">
                          <div className="field-endereco col-12">
                            <Field
                              component={AutoComplete}
                              label="Escreva o logradouro e número que você quer consultar *"
                              name="endereco"
                              required
                              validate={required}
                              esconderAsterisco
                              handleChange={handleAddressChange}
                            />
                          </div>
                        </div>
                        <Field
                          component={Select}
                          labelClassName="multiselect"
                          name="tipo_busca"
                          label="Busque kit completo ou itens avulsos*"
                          options={OPCOES_MATERIAIS}
                          validate={required}
                          naoDesabilitarPrimeiraOpcao
                        />
                        {values.tipo_busca === "itens" && (
                          <div className="field-uniforme">
                            <label
                              htmlFor={"material_escolar"}
                              className={`multiselect`}
                            >
                              Selecione itens do material escolar*
                            </label>
                            <Field
                              component={StatefulMultiSelect}
                              name="material_escolar"
                              selected={materiaisState}
                              options={materiais}
                              onSelectedChanged={(values) =>
                                setMateriaisState(values)
                              }
                              overrideStrings={{
                                selectSomeItems: "Selecione",
                                allItemsAreSelected:
                                  "Todos os itens estão selecionados",
                                selectAll: "Todos",
                              }}
                              disableSearch
                            />
                          </div>
                        )}
                        {values.tipo_busca !== "itens" && (
                          <Field
                            component={Select}
                            labelClassName="multiselect"
                            name="kit"
                            label="Selecione etapa de ensino"
                            options={KITS}
                            validate={required}
                            naoDesabilitarPrimeiraOpcao
                            disabled={
                              !values.tipo_busca ||
                              values.tipo_busca === "Selecione"
                            }
                          />
                        )}
                        <div className="btn-consultar text-center pt-3">
                          <button
                            size="lg"
                            className="btn btn-light pl-4 pr-4"
                            type="button"
                            onClick={() => getLojasNovoEndereco(form, values)}
                          >
                            <strong>Consultar</strong>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  {lojas && lojas.length > 0 && !consultarNovamente && (
                    <div className="text-dark col-lg-6 col-sm-12 lojas">
                      Essas são as{" "}
                      <span className="font-weight-bold">
                        {lojas && lojas.length} lojas{" "}
                      </span>
                      credenciadas que vendem os seguintes itens{" "}
                      {tipoBusca === "kits" &&
                        `do kit ${
                          KITS.find((kit_) => kit_.uuid === kit).nome
                        } `}
                      {tipoBusca === "itens" &&
                        ` de material escolar (${materiaisState.join(", ")}) `}
                      mais próximas da{" "}
                      <span className="font-weight-bold">{endereco}</span>.
                      <div className="row">
                        <div className="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 pt-3">
                          <Select
                            options={ORDENAR_OPCOES}
                            naoDesabilitarPrimeiraOpcao
                            onChange={(event) =>
                              onSelectChanged(event.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="tabela-lojas">
                        <div className="tabela-header row">
                          <div className="col-12">Nome</div>
                        </div>
                        {lojas &&
                          lojas
                            .slice(
                              QUANTIDADE_POR_PAGINA * (pagina - 1),
                              QUANTIDADE_POR_PAGINA * pagina
                            )
                            .map((loja, key) => {
                              return (
                                <div key={key} className="loja-collapse">
                                  <div
                                    onMouseEnter={() => setLojaHover(loja.id)}
                                    onMouseLeave={() => setLojaHover(null)}
                                    className="row td"
                                  >
                                    <div className="col-7 font-weight-bold">
                                      <div className="row p-0">
                                        <div className="col-1 my-auto">
                                          <i
                                            onClick={() =>
                                              collapseLoja(loja.id)
                                            }
                                            className={`fas fa-${
                                              loja.ativo ? "minus" : "plus"
                                            }`}
                                          />
                                        </div>
                                        <div className="col-10">
                                          {loja.nome_fantasia.toUpperCase()}
                                          <div className="clique-mensagem">
                                            Clique no + para dados de contato e
                                            preço
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="badges col-sm-5 col-12">
                                      {/*lojaForneceMalharia(loja) && (
                                    <span className="badge-fornecimento">
                                      Vestuário
                                    </span>
                                  )}
                                  {lojaForneceCalcado(loja) && (
                                    <span className="badge-fornecimento">
                                      Calçado
                                    </span>
                                  )*/}
                                    </div>
                                    {loja.ativo && (
                                      <Fragment>
                                        <div className="row">
                                          <div className="col-11 offset-1">
                                            <strong>Endereço: </strong>
                                            {loja.endereco}, {loja.numero}{" "}
                                            <br />
                                            {loja.bairro} - CEP: {loja.cep}
                                            <br />
                                            <div className="row">
                                              <div className="col-12 col-sm-6">
                                                <strong>Telefone: </strong>
                                                {loja.telefone}
                                              </div>
                                              <div className="col-12 col-sm-6">
                                                <strong>E-mail: </strong>
                                                {loja.email}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <table className="tabela-precos">
                                          <thead>
                                            <tr className="row">
                                              <th className="col-8">Item</th>
                                              <th className="col-4">
                                                Valor unidade (R$)
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {loja.proponente.ofertas_de_materiais
                                              .filter((materialEscolar) =>
                                                materiaisState.length > 0
                                                  ? materiaisState.includes(
                                                      materialEscolar.item
                                                    )
                                                  : getArrayMateriais(
                                                      kit
                                                    ).includes(
                                                      materialEscolar.item
                                                    )
                                              )
                                              .map((materialEscolar, key) => {
                                                return (
                                                  <tr className="row" key={key}>
                                                    <td className="col-8">
                                                      {materialEscolar.item}
                                                    </td>
                                                    <td className="col-4">
                                                      {materialEscolar.preco.replace(
                                                        ".",
                                                        ","
                                                      )}
                                                    </td>
                                                  </tr>
                                                );
                                              })}
                                            <tr className="row valor-total">
                                              <td className="col-8">
                                                Valor Total (R$)
                                              </td>
                                              <td className="col-4">
                                                {loja.total_materiais}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </Fragment>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        {lojas && (
                          <div>
                            <Paginacao
                              onChange={(pagina) => setPagina(pagina)}
                              total={lojas.length}
                            />
                          </div>
                        )}
                        <div className="pt-3 pb-3 text-center">
                          <button
                            size="lg"
                            disabled={!lojas}
                            className="btn btn-outline-primary pl-4 pr-4"
                            onClick={() => {
                              setConsultarNovamente(true);
                              form.change("endereco", endereco);
                              form.change("kit", kit);
                              form.change("tipo_busca", tipoBusca);
                            }}
                          >
                            <strong>Consultar novamente</strong>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-6 col-sm-12 mapa-completo">
                    {lojas ? (
                      <Mapa
                        lojaHover={lojaHover}
                        lojas={lojas}
                        tipoUniformeSelecionados={materiaisState}
                        latitude={latitude}
                        longitude={longitude}
                      />
                    ) : (
                      <div className="pt-4">Carregando mapa...</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </PaginaComCabecalhoRodape>
  );
};
