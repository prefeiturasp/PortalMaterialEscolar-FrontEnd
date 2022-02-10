import React, { Component } from "react";
import { CONSULTA_CADASTRO_URL } from "config";
import "./style.scss";

export class BannerConsultaCadastro extends Component {
  render() {
    return (
      <div className="banner-consulta-cadastro">
        <div className="titulo-banner">
          VERIFIQUE SEU CADASTRO PARA COMPRAR O MATERIAL ESCOLAR.
        </div>

        <div className="botao-container">
          <a className="botao-banner" href={CONSULTA_CADASTRO_URL}>Clique Aqui</a>
        </div>
      </div>
    );
  }
}

export default BannerConsultaCadastro;
