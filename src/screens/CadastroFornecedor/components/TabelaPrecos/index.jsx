import React, { Fragment, useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { MateriaisPorTipoEscola } from "./components/MateriaisPorTipoEscola";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { setTabelaPrecos, getMateriais } from "services/tabelaPrecos.service";
import {
  formataTabelaPrecos,
  validarFormulario,
  getNameFromLabel,
  formataMateriais,
} from "./helpers";
import { toastSuccess, toastError, toastWarn } from "components/Toast/dialogs";
import { formataEmpresa } from "screens/CadastroFornecedor/helpers";
import "./style.scss";
import { getKits } from "services/kits.service";
import { LoadingCircle } from "components/LoadingCircle";
import { getError } from "helpers/helpers";

export const TabelaPrecos = ({
  form,
  values,
  uuid,
  setTab,
  empresa,
  setEmpresa,
  logado,
}) => {
  const [kits, setKits] = useState(null);
  const [materiais, setMateriais] = useState(null);

  useEffect(() => {
    getMateriais().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setMateriais(formataMateriais(response.data));
      }
    });
    getKits().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setKits(response.data);
      }
    });
  }, []);

  const enviarPrecos = async () => {
    const erro = validarFormulario(values, kits);
    let continuar = true;
    if (empresa.status === "CREDENCIADO") {
      continuar = window.confirm(
        "Você está com status CREDENCIADO. Ao alterar suas informações, seu status passará para ALTERADO para que suas informações sejam reavalidadas. Deseja prosseguir?"
      );
    }
    if (continuar && !erro) {
      const newValues = formataTabelaPrecos(values, kits);
      let continuar2 = true;
      if (newValues.kits.length !== kits.length) {
        continuar2 = window.confirm(
          "Você não optou pelo fornecimento de alguns itens em determinadas modalidades. Deseja finalizar seu cadastro mesmo assim?"
        );
      }
      if (continuar2) {
        const response = await setTabelaPrecos(
          uuid,
          formataTabelaPrecos(values, kits)
        );
        if (response.status === HTTP_STATUS.OK) {
          setEmpresa(formataEmpresa(response.data));
          toastSuccess("Tabela de preços atualizada com sucesso");
          setTab && setTab("arquivos");
        } else {
          toastError(getError(response.data));
        }
      }
    } else {
      toastWarn(erro);
    }
  };

  const limparTabelaPrecos = () => {
    materiais &&
      materiais.forEach((material) => {
        form.change(getNameFromLabel(material.nome), undefined);
      });
    kits &&
      kits.forEach((kit) => {
        form.change(kit.uuid, undefined);
      });
  };

  return (
    <div className={`tabela-precos ${!kits && "opaco"}`}>
      <h2>Selecione o(s) kit(s) que deseja fornecer</h2>
      {kits ? (
        kits
          .filter((kit) => kit.ativo)
          .map((kit) => {
            return <MateriaisPorTipoEscola kit={kit} values={values} />;
          })
      ) : (
        <LoadingCircle />
      )}
      <div className="row mt-5 mb-5">
        {((empresa && empresa.status === "EM_PROCESSO") || logado) && (
          <Fragment>
            <div className="col-6">
              <Botao
                type={BUTTON_TYPE.BUTTON}
                onClick={() => limparTabelaPrecos()}
                texto="Limpar"
                style={BUTTON_STYLE.BLUE_OUTLINE}
              />
            </div>
            <div className="col-6 text-right">
              <Botao
                texto="Salvar"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE}
                onClick={() => enviarPrecos()}
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
