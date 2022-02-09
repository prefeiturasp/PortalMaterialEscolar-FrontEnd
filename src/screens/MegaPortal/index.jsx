import React from "react";
import { Link } from "react-router-dom";
import { PaginaComCabecalhoRodape } from "../../components/PaginaComCabecalhoRodape";
import imgDesenhoCriancas from "assets/img/desenho-alunos-mobile.svg";
import imgFamilia from "assets/img/landing-familia.png";
import imgLoja from "assets/img/landing-loja.jpg";
import { BannerConsultaCadastro } from 'components/BannerConsultaCadastro'
import { CONSULTA_CADASTRO_URL } from "config";
import "./style.scss";

export const MegaPortal = () => {
  return (
    <div className="mega-portal">
      <PaginaComCabecalhoRodape>
        <BannerConsultaCadastro />
        <div className="w-100 material-escolar position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="div-banner col-lg-8 col-sm-12 col-xl-5">
                <h4>
                  Agora os responsáveis pelos estudantes da Rede Municipal de São Paulo recebem o crédito para comprar o material escolar diretamente nas lojas credenciadas
                </h4>
                <p>
                  Para isso, basta que: <br/>
                </p>
                <ol>
                  <li>O CPF do(a) responsável esteja registrado no cadastro do(a) estudante. É possível consultar a situação cadastral na página <a href="https://consulteseucadastro.sme.prefeitura.sp.gov.br">consulteseucadastro.sme.prefeitura.sp.gov.br</a> e em caso de ajustes, o(a) responsável deverá solicitar a atualização para escola, conforme o caso.</li>
                  <li>
                    Instalar o aplicativo da <b>Kit Escolar DuePay</b> no celular ou tablet e criar a conta com mesmo CPF de responsável que consta no cadastro do(a) estudante.  <br/>
                    Após a liberação do crédito, o(a) responsável já pode realizar a compra do material escolar nas lojas credenciadas <a href="/familia">(consulte aqui as lojas mais próximas do endereço desejado)</a>. 
                  </li>
                </ol>
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
                    className="btn btn-primary col-12 pl-4 pr-4 mb-2"
                  >
                    <strong>Estudantes/famílias</strong>
                  </button>
                </Link>
                <a href={CONSULTA_CADASTRO_URL} target="blank">
                  <button
                    size="lg"
                    className="btn btn-primary col-12 pl-4 pr-4"
                  >
                    <strong>Consulta de Cadastro</strong>
                  </button>
                </a>
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
                <h2 className="cor-azul mb-4 fs-29">Área de Fornecedores</h2>
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
