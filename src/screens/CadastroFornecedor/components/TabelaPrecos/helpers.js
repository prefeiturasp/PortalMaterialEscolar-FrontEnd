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

export const validarFormulario = (values, kits) => {
  let erro = false;
  kits
    .filter((kit) => kit.ativo)
    .forEach((kit) => {
      let total = 0.0;
      kit.materiais_do_kit.forEach((materialDoKit) => {
        if (values[getNameFromLabel(materialDoKit.material.nome)]) {
          total +=
            parseFloat(
              values[getNameFromLabel(materialDoKit.material.nome)].replace(
                ",",
                "."
              )
            ) * materialDoKit.unidades;
        }
        if (total > parseFloat(kit.preco_maximo)) {
          erro = `Preço máximo do ${kit.nome}: R$ ${kit.preco_maximo.replace(
            ".",
            ","
          )}`;
          return erro;
        }
      });
    });

  return erro;
};

export const formataTabelaPrecos = (values, kits) => {
  const ofertas_de_materiais = [];
  const kits_ = [];
  kits.forEach((kit) => {
    if (
      kit.materiais_do_kit.filter(
        (materialDoKit) =>
          !values[getNameFromLabel(materialDoKit.material.nome)]
      ).length === 0
    ) {
      kits_.push(kit.uuid);
    }
    kit.materiais_do_kit.forEach((materialDoKit) => {
      if (
        !ofertas_de_materiais.find(
          (oferta) => oferta.nome === materialDoKit.material.nome
        ) &&
        values[getNameFromLabel(materialDoKit.material.nome)]
      ) {
        ofertas_de_materiais.push({
          nome: materialDoKit.material.nome,
          valor: parseFloat(
            values[getNameFromLabel(materialDoKit.material.nome)].replace(
              ",",
              "."
            )
          ),
        });
      }
    });
  });
  values.ofertas_de_materiais = ofertas_de_materiais;
  values.kits = kits_;
  return values;
};
