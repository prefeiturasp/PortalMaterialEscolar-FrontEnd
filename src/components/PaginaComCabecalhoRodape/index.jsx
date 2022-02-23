import React, { useState, useEffect } from "react";
import { MenuAcessibilidade } from "components/Menu/MenuAcessibilidade";
import { MenuPrincipal } from "components/Menu/MenuPrincipal";
import { Rodape } from "components/Rodape";
import { getAPIVersion, getFrontVersion } from "services/home.service";

export const PaginaComCabecalhoRodape = ({ children }) => {
  const [alterarFonte, setAlterarFonte] = useState("");
  const [alterarContraste, setAlterarConstraste] = useState("");
  const [apiVersion, setApiVersion] = useState(null);
  const [frontVersion, setFrontVersion] = useState(null);

  useEffect(() => {
    getAPIVersion().then((response) => {
      setApiVersion(response.data);
    });
    getFrontVersion().then((response) => {
      setFrontVersion(response.data);
    });
  }, []);

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
      <Rodape versao={`${frontVersion} (API: ${apiVersion})`} />
    </section>
  );
};
