import React from "react";
import { Link } from "react-router-dom";
import { PaginaComCabecalhoRodape } from "../../components/PaginaComCabecalhoRodape";
import imgDesenhoCriancas from "assets/img/desenho-alunos-mobile.svg";
import imgFamilia from "assets/img/landing-familia.png";
import imgLoja from "assets/img/landing-loja.png";
import "./style.scss";

export const MegaPortal = () => {
  return (
    <div className="mega-portal">
      <PaginaComCabecalhoRodape>
        <div className="w-100 material-escolar position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="div-banner col-lg-8 col-sm-12 col-xl-6">
                <h1>
                  Para atendermos as preferências dos estudantes e famílias,
                  agora os kits de materiais escolares estarão disponíveis em
                  lojas credenciadas, oferecendo mais qualidade e agilidade.
                </h1>
                <p>
                  Em 2020, os kits de material escolar continuarão com a mesma
                  composição, mas, com inovações na forma de fornecimento.
                </p>
              </div>
              <img
                src={imgDesenhoCriancas}
                width="100%"
                alt="Familia"
                className="desenho-criancas img-fluid rounded"
              />
            </div>
          </div>
        </div>
        <div id="conteudo" className="pt-5 w-100 home">
          <div className="container">
            <h2 className="cor-azul mb-4">
              Para obter mais informações, acesse a seção que atenda seu perfil
            </h2>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5 mb-5">
            <div className="col-12 col-sm-5">
              <img
                src={imgFamilia}
                width="100%"
                alt="Familia"
                className="img-fluid rounded"
              />
              <div className="pt-5">
                <h2 className="cor-azul mb-4 fs-29">
                  Área de estudantes/famílias
                </h2>
                <div className="justify-content-lg-end justify-content-center">
                  Obtenha informações sobre o kit de material escolar para as
                  crianças e estudantes da cidade de São Paulo
                </div>
              </div>
              <div className="pt-3">
                <Link to="/familia">
                  <button
                    size="lg"
                    className="btn btn-primary col-12 pl-4 pr-4"
                  >
                    <strong>Estudantes/famílias</strong>
                  </button>
                </Link>
              </div>
            </div>
            <div className="area-fabricantes col-12 offset-sm-2 col-sm-5">
              <img
                src={imgLoja}
                width="100%"
                alt="Loja de material escolar"
                className="img-fluid rounded"
              />
              <div className="pt-5">
                <h2 className="cor-azul mb-4 fs-29">
                  Área de Fornecedores
                </h2>
                <div className="justify-content-lg-end justify-content-center">
                  Venha contribuir com o fornecimento dos materiais escolares
                  para as crianças e estudantes da cidade de São Paulo
                </div>
              </div>
              <div className="pt-3">
                <Link to="/fornecedor">
                  <button
                    size="lg"
                    className="btn btn-primary col-12 pl-4 pr-4"
                  >
                    <strong>Fornecedores</strong>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    </div>
  );
};
