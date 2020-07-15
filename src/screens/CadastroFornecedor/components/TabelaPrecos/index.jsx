import React, { useState, useCallback } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field } from "react-final-form";
import { ProdutoPreco } from "./components/ProdutoPreco";
import { MateriaisPorTipoEscola } from "./components/MateriaisPorTipoEscola";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { setTabelaPrecos } from "services/tabelaPrecos.service";
import { formataTabelaPrecos } from "./helpers";
import { OnChange } from "react-final-form-listeners";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import "./style.scss";

export const TabelaPrecos = ({ form, values, uuid }) => {
  const enviarPrecos = async () => {
    const response = await setTabelaPrecos(uuid, formataTabelaPrecos(values));
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Tabela de preços atualizada com sucesso");
    } else {
      toastError("Erro ao atualizar tabela de preços");
    }
  };

  const useForceUpdate = () => {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  };

  const limparTabelaPrecos = () => {
    form.change("agenda_educacao_infantil_check", false);
    form.change("agenda_ensino_fundamental_check", false);
    form.change("apontador_check", false);
    form.change("borracha_check", false);
    form.change("caderno_brochurao_80_fls_check", false);
    form.change("caderno_desenho_96_fls_check", false);
    form.change("caderno_universitario_96_fls_check", false);
    form.change("caderno_universitario_200_fls_check", false);
    form.change("caneta_esferografica_azul_check", false);
    form.change("caneta_esferografica_preta_check", false);
    form.change("caneta_esferografica_vermelha_check", false);
    form.change("caneta_hidrografica_12_cores_check", false);
    form.change("cola_branca_check", false);
    form.change("esquadro_45_check", false);
    form.change("esquadro_60_check", false);
    form.change("estojo_escolar_check", false);
    form.change("giz_de_cera_ensino_fundamental_12_cores_check", false);
    form.change("giz_de_cera_grosso_educacao_infantil_12_cores_check", false);
    form.change("lapis_de_cor_12_cores_check", false);
    form.change("lapis_grafite_check", false);
    form.change("massa_para_modelar_06_cores_check", false);
    form.change("regua_check", false);
    form.change("tesoura_check", false);
    form.change("tinta_guache_06_cores_check", false);
    form.change("transferidor_180_check", false);
    form.change("agenda_educacao_infantil", undefined);
    form.change("agenda_ensino_fundamental", undefined);
    form.change("apontador", undefined);
    form.change("borracha", undefined);
    form.change("caderno_brochurao_80_fls", undefined);
    form.change("caderno_desenho_96_fls", undefined);
    form.change("caderno_universitario_96_fls", undefined);
    form.change("caderno_universitario_200_fls", undefined);
    form.change("caneta_esferografica_azul", undefined);
    form.change("caneta_esferografica_preta", undefined);
    form.change("caneta_esferografica_vermelha", undefined);
    form.change("caneta_hidrografica_12_cores", undefined);
    form.change("cola_branca", undefined);
    form.change("esquadro_45", undefined);
    form.change("esquadro_60", undefined);
    form.change("estojo_escolar", undefined);
    form.change("giz_de_cera_ensino_fundamental_12_cores", undefined);
    form.change("giz_de_cera_grosso_educacao_infantil_12_cores", undefined);
    form.change("lapis_de_cor_12_cores", undefined);
    form.change("lapis_grafite", undefined);
    form.change("massa_para_modelar_06_cores", undefined);
    form.change("regua", undefined);
    form.change("tesoura", undefined);
    form.change("tinta_guache_06_cores", undefined);
    form.change("transferidor_180", undefined);
  };

  const forceUpdate = useForceUpdate();

  return (
    <div className="tabela-precos">
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
                values.agenda_educacao_infantil_check = value;
                values.agenda_ensino_fundamental_check = value;
                values.apontador_check = value;
                values.borracha_check = value;
                values.caderno_brochurao_80_fls_check = value;
                values.caderno_desenho_96_fls_check = value;
                values.caderno_universitario_96_fls_check = value;
                values.caderno_universitario_200_fls_check = value;
                values.caneta_esferografica_azul_check = value;
                values.caneta_esferografica_preta_check = value;
                values.caneta_esferografica_vermelha_check = value;
                values.caneta_hidrografica_12_cores_check = value;
                values.cola_branca_check = value;
                values.esquadro_45_check = value;
                values.esquadro_60_check = value;
                values.estojo_escolar_check = value;
                values.giz_de_cera_ensino_fundamental_12_cores_check = value;
                values.giz_de_cera_grosso_educacao_infantil_12_cores_check = value;
                values.lapis_de_cor_12_cores_check = value;
                values.lapis_grafite_check = value;
                values.massa_para_modelar_06_cores_check = value;
                values.regua_check = value;
                values.tesoura_check = value;
                values.tinta_guache_06_cores_check = value;
                values.transferidor_180_check = value;
                if (!value) {
                  form.change("agenda_educacao_infantil", undefined);
                  form.change("agenda_ensino_fundamental", undefined);
                  form.change("apontador", undefined);
                  form.change("borracha", undefined);
                  form.change("caderno_brochurao_80_fls", undefined);
                  form.change("caderno_desenho_96_fls", undefined);
                  form.change("caderno_universitario_96_fls", undefined);
                  form.change("caderno_universitario_200_fls", undefined);
                  form.change("caneta_esferografica_azul", undefined);
                  form.change("caneta_esferografica_preta", undefined);
                  form.change("caneta_esferografica_vermelha", undefined);
                  form.change("caneta_hidrografica_12_cores", undefined);
                  form.change("cola_branca", undefined);
                  form.change("esquadro_45", undefined);
                  form.change("esquadro_60", undefined);
                  form.change("estojo_escolar", undefined);
                  form.change(
                    "giz_de_cera_ensino_fundamental_12_cores",
                    undefined
                  );
                  form.change(
                    "giz_de_cera_grosso_educacao_infantil_12_cores",
                    undefined
                  );
                  form.change("lapis_de_cor_12_cores", undefined);
                  form.change("lapis_grafite", undefined);
                  form.change("massa_para_modelar_06_cores", undefined);
                  form.change("regua", undefined);
                  form.change("tesoura", undefined);
                  form.change("tinta_guache_06_cores", undefined);
                  form.change("transferidor_180", undefined);
                }
                forceUpdate();
              }}
            </OnChange>
            Marcar todos
          </label>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="agenda_educacao_infantil"
                label="Agenda Educação Infantil"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="agenda_ensino_fundamental"
                label="Agenda Ensino Fundamental"
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="apontador"
                label="Apontador"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco name="borracha" label="Borracha" values={values} />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="caderno_brochurao_80_fls"
                label="Caderno brochurão 80 Fls."
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="caderno_desenho_96_fls"
                label="Caderno desenho 96 Fls."
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="caderno_universitario_96_fls"
                label="Caderno universitário 96 Fls."
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="caderno_universitario_200_fls"
                label="Caderno universitário 200 Fls."
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="caneta_esferografica_azul"
                label="Caneta esferográfica azul"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="caneta_esferografica_preta"
                label="Caneta esferográfica preta"
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="caneta_esferografica_vermelha"
                label="Caneta esferográfica vermelha"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="caneta_hidrografica_12_cores"
                label="Caneta hidrográfica (12 cores)"
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="cola_branca"
                label="Cola branca"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="esquadro_45"
                label="Esquadro 45º"
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="esquadro_60"
                label="Esquadro 60º"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="estojo_escolar"
                label="Estojo escolar"
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="giz_de_cera_ensino_fundamental_12_cores"
                label="Giz de cera Ensino Fundamental (12 cores)"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="giz_de_cera_grosso_educacao_infantil_12_cores"
                label="Giz de cera grosso Educação Infantil (12 cores)"
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="lapis_de_cor_12_cores"
                label="Lápis de cor (12 cores)"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="lapis_grafite"
                label="Lápis grafite"
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="massa_para_modelar_06_cores"
                label="Massa para modelar (06 cores)"
                values={values}
              />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco name="regua" label="Régua" values={values} />
            </div>
          </div>
          <div className="row  mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco name="tesoura" label="Tesoura" values={values} />
            </div>
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="tinta_guache_06_cores"
                label="Tinta guache (06 cores)"
                values={values}
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 col-12">
              <ProdutoPreco
                name="transferidor_180"
                label="Transferidor 180º"
                values={values}
              />
            </div>
          </div>
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
        <div className="col-6">
          <Botao
            type={BUTTON_TYPE.BUTTON}
            onClick={() => limparTabelaPrecos()}
            texto="Limpar"
            style={BUTTON_STYLE.BLUE_OUTLINE}
          />
        </div>
        <div className="col-12 text-right">
          <Botao
            texto="Salvar"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.BLUE}
            onClick={() => enviarPrecos()}
          />
        </div>
      </div>
    </div>
  );
};
