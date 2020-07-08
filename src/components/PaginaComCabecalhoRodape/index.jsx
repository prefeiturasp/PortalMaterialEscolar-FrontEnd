import React, { useState } from "react";
import { version } from "../../../package.json";
import { MenuAcessibilidade } from "components/Menu/MenuAcessibilidade";
import { MenuPrincipal } from "components/Menu/MenuPrincipal";
import { Rodape } from "components/Rodape";

export const PaginaComCabecalhoRodape = ({ children }) => {
  const [alterarFonte, setAlterarFonte] = useState("");
  const [alterarContraste, setAlterarConstraste] = useState("");
  const [apiVersion] = useState(null);

  const handleFonte = () => {
    setAlterarFonte(!alterarFonte);
  };

  const handleConstraste = () => {
    setAlterarConstraste(!alterarContraste);
  };

  return (
    <section
      role="main"
      className={`${alterarFonte && "fonte-maior"} ${
        alterarContraste && "alto-contraste"
      }`}
    >
      <MenuAcessibilidade
        handleFonte={handleFonte}
        handleConstraste={handleConstraste}
      />
      <MenuPrincipal />
      {children}
      <Rodape versao={`${version} (API: ${apiVersion})`} />
    </section>
  );
};
