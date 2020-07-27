export const getNameFromLabel = (label) => {
  return label
    ? label
        .normalize("NFD")
        .replace(/[\u0300-\u036fº.()]/g, "")
        .replace(/ /g, "_")
        .toLowerCase()
    : "undefined";
};

export const formataMateriais = (materiais) => {
  return materiais.map((material) => {
    material.name = getNameFromLabel(material.nome);
    return material;
  });
};

export const validarFormulario = (values, materiais) => {
  let erro = false;
  for (let [key] of Object.entries(values)) {
    if (
      key.includes("_check") &&
      values[key] &&
      !values[key.replace("_check", "")]
    ) {
      erro = `Campo ${
        materiais.find(
          (material) => material.name === key.replace("_check", "")
        ).nome
      } não possui valor`;
      return erro;
    } else if (
      key.includes("_check") &&
      values[key.replace("_check", "")] &&
      parseFloat(values[key.replace("_check", "")].replace(",", ".")) >
        parseFloat(
          materiais.find(
            (material) => material.name === key.replace("_check", "")
          ).preco_maximo
        )
    ) {
      erro = `Valor máximo do campo ${
        materiais.find(
          (material) => material.name === key.replace("_check", "")
        ).nome
      }: ${materiais
        .find((material) => material.name === key.replace("_check", ""))
        .preco_maximo.replace(".", ",")}`;
      return erro;
    } else if (
      key.includes("_check") &&
      values[key.replace("_check", "")] &&
      parseFloat(values[key.replace("_check", "")].replace(",", ".")) === 0
    ) {
      erro = `Valor do campo ${
        materiais.find(
          (material) => material.name === key.replace("_check", "")
        ).nome
      } não pode ser R$ 0,00`;
      return erro;
    }
  }
  return erro;
};

export const formataTabelaPrecos = (values, materiais) => {
  const ofertas_de_materiais = [];
  for (let [key] of Object.entries(values)) {
    if (key.includes("_check") && values[key]) {
      ofertas_de_materiais.push({
        nome: materiais.find(
          (material) => material.name === key.replace("_check", "")
        ).nome,
        valor: parseFloat(values[key.replace("_check", "")].replace(",", ".")),
      });
    }
  }
  values.ofertas_de_materiais = ofertas_de_materiais;
  return values;
};
