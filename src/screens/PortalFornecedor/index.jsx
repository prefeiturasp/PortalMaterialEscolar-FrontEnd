import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Link } from "react-router-dom";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import imgDesenhoFornecedor from "assets/img/landing-fornecedor-wide.jpg";
import imgFachadaLoja from "assets/img/landing-loja-fundo-branco.jpg";
import imgMateriais from "assets/img/materiais.svg";
import Botao from "components/Botao";
import { BUTTON_STYLE } from "components/Botao/constants";
import { KitMaterialEscolar } from "../../components/KitMaterialEscolar";
import {
  getEdital,
  getInstrucaoNormativa,
} from "services/homeFornecedor.service";
import { API_URL } from "config";
import { getKits } from "services/kits.service";
import "./style.scss";

export const PortalFornecedor = () => {
  const [kits, setKits] = useState(null);
  const [edital, setEdital] = useState(null);
  const [instrucaoNormativa, setInstrucaoNormativa] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getEdital().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setEdital(API_URL.replace("api", "") + response.data);
      }
    });
    getKits().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setKits(response.data);
      }
    });
    getInstrucaoNormativa().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setInstrucaoNormativa(API_URL.replace("api", "") + response.data);
      }
    });
  }, []);

  return (
    <div className="portal-fornecedor">
      <PaginaComCabecalhoRodape>
        <div className="w-100 oferta-materiais position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="col-lg-8 col-sm-12 col-xl-6">
                <h1>
                  Contribua com a educação do nosso município e torne-se um
                  fornecedor de material escolar.
                </h1>
                <p>
                  Leia o regulamento, veja se sua loja está de acordo com os
                  critérios necessários para o credenciamento e faça a diferença
                  na educação de nossos estudantes.
                  <br />
                  Além disso, você poderá comercializar os materiais sem
                  pagar nenhuma taxa para a empresa que gerencia as
                  transações financeiras!
                </p>
                <img
                  src={imgDesenhoFornecedor}
                  width="100%"
                  alt="Fornecedor"
                  className="desenho-fornecedor img-fluid rounded"
                />
                <a href="#conteudo">
                  <Botao
                    className="col-sm-4 col-12 fs-16"
                    texto="Saiba mais"
                    style={BUTTON_STYLE.BLUE}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="conteudo" className="w-100 home">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6 mb-lg-0">
                <img
                  src={imgFachadaLoja}
                  alt="Fachada de uma lojinha de roupas"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-lg-6">
                <h2 className="cor-azul mb-4">
                  O que é necessário para ser fornecedor?
                </h2>
                <div className="justify-content-lg-end justify-content-center">
                  <p className="mb-1">
                    Para ser credenciado, o comerciante deve:
                  </p>
                  <ul className="lista-home ml-0 pl-0 mb-2">
                    <li>Ser pessoa jurídica com objeto social compatível ao fornecimento;</li>
                    <li>
                      Possuir toda a documentação válida conforme as condições
                      do
                      <a className="links-intrucoes" href={edital}>
                        <strong> Edital</strong>
                      </a>
                      ;
                    </li>
                    <li>
                      Conhecer e concordar com as regras previstas no{" "}
                      <a className="links-intrucoes" href={edital}>
                        <strong> Edital </strong>
                      </a>
                      de Credenciamento;
                    </li>
                    <li>
                      Responsabilizar-se por todas as informações fornecidas;
                    </li>
                    <li>
                      Possuir stand de vendas ou loja física na cidade de São
                      Paulo;
                    </li>
                    <li>
                      Emitir Nota Fiscal Eletrônica ou Cupom Fiscal Eletrônico
                      no CPF do(a) responsável legal pelo(a) aluno(a);
                    </li>
                    <li>
                      Comprometer-se em fornecer os itens com a qualidade
                      exigida nas especificações técnicas;
                    </li>
                    <li>Estar ciente das hipóteses de descredenciamento;</li>
                    <li>Estar ciente das penalidades previstas;</li>
                  </ul>
                  <p className="mb-2">
                    Veja todas as condições necessárias abaixo:
                  </p>
                  <p>
                    <a
                      className="links-intrucoes"
                      href={instrucaoNormativa}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>[Link Instrução Normativa]</strong>
                    </a>
                  </p>
                  <p>
                    <a
                      className="links-intrucoes"
                      href="http://legislacao.prefeitura.sp.gov.br/leis/decreto-44279-de-24-de-dezembro-de-2003"
                    >
                      <strong>[Link Dec. Municipal 44.279/2003]</strong>
                    </a>
                  </p>
                  <p>
                    <a
                      className="links-intrucoes"
                      href={edital}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>[Link Edital]</strong>
                    </a>
                  </p>
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

        <div className="w-100 mb-5 mt-5">
          <div className="container">
            <h2 className="cor-azul mb-4">
              O que acontece depois de se cadastrar?
            </h2>
            <p>
              Você receberá um número de protocolo para identificação da
              solicitação. Caso esteja dentro dos critérios, será notificado com
              o resultado da análise da área técnica quanto à possibilidade de
              fornecimento dos materiais escolares.
            </p>
          </div>
        </div>
        <div className="w-100 faq text-center mt-5">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="text-white mb-4">
                Ainda com dúvidas? Acesse o nosso FAQ
              </h3>
              <a href="https://educacao.sme.prefeitura.sp.gov.br/perguntas-frequentes-dos-interessados-em-se-cadastrar-para-vender-material-escolar-as-familias/">
                <button size="lg" className="btn btn-light pl-4 pr-4">
                  <strong>FAQ</strong>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="w-100 sociedade-governo text-center">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="text-white mb-4">
                Possui as condições necessárias? Cadastre-se e se torne um
                fornecedor.
              </h3>
              <p className="mb-0">
                <Link to="/fornecedor/cadastro">
                  <button size="lg" className="btn btn-light pl-4 pr-4">
                    <strong>Cadastre sua Loja</strong>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
