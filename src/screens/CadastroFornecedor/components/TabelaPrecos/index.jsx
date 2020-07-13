import React, { useState } from "react";
import { Field } from "react-final-form";
import { ProdutoPreco } from "./components/ProdutoPreco";
import "./style.scss";
import { MateriaisPorTipoEscola } from "./components/MateriaisPorTipoEscola";
import Botao from "components/Botao";
import { BUTTON_STYLE } from "components/Botao/constants";

export const TabelaPrecos = ({ form, values }) => {
  const [marcarTodosFlag, setMarcarTodosFlag] = useState(false);

  const marcarTodos = () => {
    setMarcarTodosFlag(!marcarTodosFlag);
    values.agenda_educacao_infantil_check = !marcarTodosFlag;
    values.agenda_ensino_fundamental_check = !marcarTodosFlag;
    values.apontador_check = !marcarTodosFlag;
    values.borracha_check = !marcarTodosFlag;
    values.caderno_brochurao_80_fls_check = !marcarTodosFlag;
    values.caderno_desenho_96_fls_check = !marcarTodosFlag;
    values.caderno_universitario_96_fls_check = !marcarTodosFlag;
    values.caderno_universitario_200_fls_check = !marcarTodosFlag;
    values.caneta_esferografica_azul_check = !marcarTodosFlag;
    values.caneta_esferografica_preta_check = !marcarTodosFlag;
    values.caneta_esferografica_vermelha_check = !marcarTodosFlag;
    values.caneta_hidrografica_12_cores_check = !marcarTodosFlag;
    values.cola_branca_check = !marcarTodosFlag;
    values.esquadro_45_check = !marcarTodosFlag;
    values.esquadro_60_check = !marcarTodosFlag;
    values.estojo_escolar_check = !marcarTodosFlag;
    values.giz_de_cera_ensino_fundamental_12_cores_check = !marcarTodosFlag;
    values.giz_de_cera_grosso_educacao_infantil_12_cores_check = !marcarTodosFlag;
    values.lapis_de_cor_12_cores_check = !marcarTodosFlag;
    values.lapis_grafite_check = !marcarTodosFlag;
    values.massa_para_modelar_06_cores_check = !marcarTodosFlag;
    values.regua_check = !marcarTodosFlag;
    values.tesoura_check = !marcarTodosFlag;
    values.tinta_guache_06_cores_check = !marcarTodosFlag;
    values.transferidor_180_check = !marcarTodosFlag;
    if (marcarTodosFlag) {
      form.reset();
    }
  };

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
            <Field
              name="marcar_todos"
              component="input"
              type="checkbox"
              onClick={() => marcarTodos()}
            />
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
                label=" Giz de cera Ensino Fundamental (12 cores)"
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
          <Botao texto="Limpar" style={BUTTON_STYLE.BLUE_OUTLINE} />
        </div>
        <div className="col-6 text-right">
          <Botao texto="Salvar" style={BUTTON_STYLE.BLUE} />
        </div>
      </div>
    </div>
  );
};
