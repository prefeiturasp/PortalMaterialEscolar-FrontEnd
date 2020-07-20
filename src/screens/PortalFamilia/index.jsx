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

  const consultarEndereco = () => {
    if (!latitude || !longitude) {
      toastWarn("Selecione um dos resultados de endereço para buscar");
    } else if (materiaisSelecionados.length === 0) {
      toastWarn("Selecione ao menos um materialEscolar");
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
                    <div className="field-uniforme col-sm-12 col-md-4">
                      <label
                        htmlFor={"tipo_uniforme"}
                        className={`multiselect`}
                      >
                        Selecione itens do uniforme *
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
                  </div>
                  <div className="btn-consultar text-center">
                    <button
                      size="lg"
                      type="button"
                      className="btn btn-light pl-4 pr-4"
                      onClick={() => consultarEndereco()}
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
              <div className="col-lg-6">
                <h2 className="cor-azul mb-4">
                  Por que o modelo de compra de uniforme mudou?"
                </h2>
                <div className="justify-content-lg-end justify-content-center">
                  O uniforme escolar, em geral, era comprado de forma
                  centralizada pela Prefeitura e distribuído aos estudantes nas
                  escolas. Esse modelo de compra tinha como desvantagens
                  dificuldades em encontrar fornecedores que oferecessem
                  produtos de qualidade aliados a bom preço, seguindo as regras
                  do processo de compra pública (chamado de licitação). Outro
                  fator complicador era de os estudantes não poderem provar o
                  uniforme antes da compra (causando problemas na escolha do
                  tamanho adequado para cada peça) e a complexa logística de
                  distribuição (que aumentava o risco de atraso na entrega).
                </div>
              </div>
              <div className="col-lg-6 mb-lg-0">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    title="Vídeo sobre o Portal do Uniforme"
                    src="https://www.youtube.com/embed/eggj-Pw2LHI"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
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
        <div className="container agora-cada-bloco">
          Agora, cada família poderá compor o kit da forma que for mais adequada
          a cada estudante, consideradas suas necessidades específicas e
          respeitado o padrão das peças aprovado pela Secretaria Municipal de
          Educação e o valor limite de R$ 215 disponibilizado. <br /> A compra
          será feita diretamente pelas famílias nas lojas credenciadas, a partir
          de um sistema de crédito. O(a) responsável legal pelo estudante não
          receberá diretamente os R$ 215 do kit do uniforme escolar na sua
          conta, mas sim terá direito a gastar esse valor adquirindo o uniforme
          escolar nas lojas autorizadas (e são elas que farão a prestação de
          contas à Prefeitura).
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-6">
              <h2 className="cor-azul mb-4">
                Ajude a Prefeitura a garantir a qualidade do uniforme
              </h2>
              <div className="justify-content-lg-end justify-content-center">
                As lojas credenciadas para a venda do uniforme escolar precisam
                seguir o padrão estabelecido pela Secretaria Municipal de
                Educação, tanto no que diz respeito aos modelos, cores, quanto à
                qualidade do material. Para saber como conferir se os produtos
                vendidos estão de fato cumprindo com todas as exigências, veja
                as dicas neste vídeo:
              </div>
            </div>
            <div className="col-lg-6 mb-lg-0">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Vídeo sobre o Portal do Uniforme"
                  src="https://www.youtube.com/embed/kjN_J1RRkq4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <h2 className="cor-azul mb-4">Problemas na compra do uniforme</h2>
          <div className="justify-content-lg-end justify-content-center">
            Em caso de problemas como possíveis falhas na confecção das peças,
            entre em contato com a loja onde produto foi adquirido. Para
            situações sem solução direta com o lojista, informe à Prefeitura nos
            Canais de Atendimento do SP 156 ou recorra a qualquer órgão de
            defesa do consumidor.
          </div>
          <div className="text-center pt-3 pb-3">
            <a href="https://sp156.prefeitura.sp.gov.br/portal/servicos/informacao?servico=3616">
              <button size="lg" className="btn btn-primary pl-4 pr-4">
                <strong>Avise sobre problemas</strong>
              </button>
            </a>
          </div>
        </div>
        <div className="w-100 sociedade-governo text-center mt-5">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="text-white mb-4">
                Não perca tempo, solicite já o uniforme!
              </h3>
              <a
                className="mb-0"
                href="https://pedido-uniforme.sme.prefeitura.sp.gov.br"
              >
                <button size="lg" className="btn btn-light pl-4 pr-4">
                  <strong>Solicite o uniforme</strong>
                </button>
              </a>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
