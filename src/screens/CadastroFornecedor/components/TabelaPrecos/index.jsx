import React, { Fragment, useState, useEffect, useCallback } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field } from "react-final-form";
import { ProdutoPreco } from "./components/ProdutoPreco";
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
import { OnChange } from "react-final-form-listeners";
import { toastSuccess, toastError, toastWarn } from "components/Toast/dialogs";
import { formataEmpresa } from "screens/CadastroFornecedor/helpers";
import "./style.scss";

export const TabelaPrecos = ({
  form,
  values,
  uuid,
  setTab,
  empresa,
  setEmpresa,
}) => {
  const [materiais, setMateriais] = useState(null);

  useEffect(() => {
    getMateriais().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setMateriais(formataMateriais(response.data));
      }
    });
  }, []);

  const enviarPrecos = async () => {
    const erro = validarFormulario(values, materiais);
    if (!erro) {
      const response = await setTabelaPrecos(
        uuid,
        formataTabelaPrecos(values, materiais)
      );
      if (response.status === HTTP_STATUS.OK) {
        setEmpresa(formataEmpresa(response.data));
        toastSuccess("Tabela de preços atualizada com sucesso");
        setTab("arquivos");
      } else {
        toastError("Erro ao atualizar tabela de preços");
      }
    } else {
      toastWarn(erro);
    }
  };

  const limparTabelaPrecos = () => {
    materiais &&
      materiais.forEach((material) => {
        form.change(`${getNameFromLabel(material.nome)}_check`, false);
        form.change(getNameFromLabel(material.nome), undefined);
      });
  };

  return (
    <div className="tabela-precos">
      <div className="row mb-5">
        {empresa && empresa.status !== "INSCRITO" && (
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
      <div className="card">
        <div className="card-body">
          <h2>Preços (fornecimento)</h2>
          <h3 className="pt-2">
            Selecione os materiais escolares disponíveis em seu estabelecimento
            (s) e insira o preço da unidade.
          </h3>
          <hr />
          <label className="marcar-todos">
            <Field name="marcar_todos" component="input" type="checkbox" />
            <OnChange name={`marcar_todos`}>
              {(value, previous) => {
                materiais &&
                  materiais.forEach((material) => {
                    form.change(
                      `${getNameFromLabel(material.nome)}_check`,
                      value
                    );
                    if (!value) {
                      form.change(getNameFromLabel(material.nome), undefined);
                    }
                  });
              }}
            </OnChange>
            Marcar todos
          </label>
          {materiais &&
            materiais.map((material, index) => {
              const materialDiv2 = materiais[index + 1]
                ? materiais[index + 1]
                : null;
              return (
                <div key={index}>
                  {index % 2 === 0 && (
                    <div className="row mb-sm-3">
                      <div className="col-sm-6 col-12">
                        <ProdutoPreco
                          form={form}
                          name={getNameFromLabel(material.nome)}
                          precoMaximo={material.preco_maximo}
                          label={material.nome}
                          values={values}
                        />
                      </div>
                      {materialDiv2 && (
                        <div className="col-sm-6 col-12">
                          <ProdutoPreco
                            form={form}
                            name={getNameFromLabel(materiais[index + 1].nome)}
                            label={materiais[index + 1].nome}
                            precoMaximo={materiais[index + 1].preco_maximo}
                            values={values}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <MateriaisPorTipoEscola tipoEscola="educacao_infantil" values={values} />
      <MateriaisPorTipoEscola
        tipoEscola="ensino_fundamental_alfabetizacao"
        values={values}
      />
      <MateriaisPorTipoEscola
        tipoEscola="ensino_fundamental_interdisciplinar"
        values={values}
      />
      <MateriaisPorTipoEscola
        tipoEscola="ensino_fundamental_autoral"
        values={values}
      />
      <MateriaisPorTipoEscola
        tipoEscola="ensino_medio_eja_mova"
        values={values}
      />
      <div className="row mt-5 mb-5">
        {empresa && empresa.status !== "INSCRITO" && (
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
