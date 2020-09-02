import React, { useState } from "react";
import logoEducacaoSP from "assets/img/educacao_sp.png";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./style.scss";

export const MenuPrincipal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-lg-3 col-sm-12 d-flex justify-content-lg-start justify-content-center align-items-end mb-4 mb-lg-0">
          <h1 className="m-0">
            <a href="https://educacao.sme.prefeitura.sp.gov.br/">
              <img
                src={logoEducacaoSP}
                alt="Escola Aberta"
                className="img-fluid"
              />
            </a>
          </h1>
        </div>
        <div
          id="menu-principal"
          className="col-lg-9 col-sm-12 links-menu d-flex flex-wrap  align-items-end justify-content-lg-end justify-content-start pr-lg-0 mb-xs-4"
        >
          {window.location.pathname === "/" && (
            <ul className="nav nav-tabs border-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-secondary mb-1 pb-0"
                  to="/familia"
                >
                  Área de estudantes/famílias
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-secondary mb-1 pb-0"
                  to="/fornecedor"
                >
                  Área de fornecedores
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-secondary mb-1 pb-0"
                  to="/fornecedor/lojas-credenciadas"
                >
                  Lojas credenciadas
                </Link>
              </li>
            </ul>
          )}
          {[
            "/fornecedor",
            "/fornecedor/cadastro",
            "/confirmacao-cadastro",
          ].includes(window.location.pathname) && (
            <ul className="nav nav-tabs border-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-secondary mb-1 pb-0"
                  to="/fornecedor"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-secondary mb-1 pb-0"
                  to="/fornecedor/cadastro"
                >
                  Cadastre sua Loja
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-secondary mb-1 pb-0"
                  to="/fornecedor/login"
                >
                  Área restrita
                </Link>
              </li>
            </ul>
          )}
          {["/familia", "/mapa-de-fornecedores"].includes(
            window.location.pathname
          ) && (
            <ul className="nav nav-tabs border-0">
              <li className="nav-item">
                <Link className="nav-link text-secondary mb-1 pb-0" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-secondary mb-1 pb-0"
                  href="https://sp156.prefeitura.sp.gov.br/portal/servicos/informacao?t=666&a=710&servico=3798"
                >
                  Avise sobre Problemas
                </a>
              </li>
              <li className="nav-item">
                <p
                  className="nav-link text-secondary mb-1 pb-0 c-pointer"
                  onClick={handleShow}
                >
                  Dúvidas? Veja a lista com perguntas frequentes
                </p>
              </li>
            </ul>
          )}
        </div>
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
  );
};
