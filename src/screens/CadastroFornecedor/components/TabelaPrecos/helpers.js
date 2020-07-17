export const MATERIAL_LABEL = {
  agenda_educacao_infantil: "Agenda Educação Infantil",
  agenda_ensino_fundamental: "Agenda Ensino Fundamental",
  apontador: "Apontador",
  borracha: "Borracha",
  caderno_brochurao_80_fls: "Caderno brochurão 80 Fls.",
  caderno_desenho_96_fls: "Caderno desenho 96 Fls.",
  caderno_universitario_96_fls: "Caderno universitário 96 Fls.",
  caderno_universitario_200_fls: "Caderno universitário 200 Fls.",
  caneta_esferografica_azul: "Caneta esferográfica azul",
  caneta_esferografica_preta: "Caneta esferográfica preta",
  caneta_esferografica_vermelha: "Caneta esferográfica vermelha",
  caneta_hidrografica_12_cores: "Caneta hidrográfica (12 cores)",
  cola_branca: "Cola branca",
  esquadro_45: "Esquadro 45º",
  esquadro_60: "Esquadro 60º",
  estojo_escolar: "Estojo escolar",
  giz_de_cera_ensino_fundamental_12_cores:
    "Giz de cera Ensino Fundamental (12 cores)",
  giz_de_cera_grosso_educacao_infantil_12_cores:
    "Giz de cera grosso Educação Infantil (12 cores)",
  lapis_de_cor_12_cores: "Lápis de cor (12 cores)",
  lapis_grafite: "Lápis grafite",
  massa_para_modelar_06_cores: "Massa para modelar (06 cores)",
  regua: "Régua",
  tesoura: "Tesoura",
  tinta_guache_06_cores: "Tinta guache (06 cores)",
  transferidor_180: "Transferidor 180º",
};

export const validarFormulario = (values) => {
  let erro = false;
  for (let [key, _] of Object.entries(values)) {
    if (
      key.includes("_check") &&
      values[key] &&
      !values[key.replace("_check", "")]
    ) {
      erro = `Campo ${
        MATERIAL_LABEL[key.replace("_check", "")]
      } não possui valor`;
      return erro;
    } else if (
      key.includes("_check") &&
      values[key.replace("_check", "")] &&
      parseFloat(values[key.replace("_check", "")].replace(",", ".")) > 10
    ) {
      erro = `Valor máximo do campo ${
        MATERIAL_LABEL[key.replace("_check", "")]
      }: R$ 10,00`;
      return erro;
    } else if (
      key.includes("_check") &&
      values[key.replace("_check", "")] &&
      parseFloat(values[key.replace("_check", "")].replace(",", ".")) === 0
    ) {
      erro = `Valor do campo ${
        MATERIAL_LABEL[key.replace("_check", "")]
      } não pode ser R$ 0,00`;
      return erro;
    }
  }
  return erro;
};

export const formataTabelaPrecos = (values) => {
  const ofertas_de_materiais = [];
  for (let [key, _] of Object.entries(values)) {
    if (key.includes("_check") && values[key]) {
      ofertas_de_materiais.push({
        nome: MATERIAL_LABEL[key.replace("_check", "")],
        valor: parseFloat(values[key.replace("_check", "")].replace(",", ".")),
      });
    }
  }
  values.ofertas_de_materiais = ofertas_de_materiais;
  return values;
};
