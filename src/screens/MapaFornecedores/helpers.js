export const getArrayMateriais = (kits, kit) => {
  const materiais = [];
  kits
    .find((kit_) => kit_.uuid === kit)
    .materiais_do_kit.forEach((materialKit) => {
      materiais.push(materialKit.material.nome);
    });
  return materiais;
};

export const acrescentaTotalMateriais = (lojas, kits, kit) => {
  if (kit === undefined) {
    return lojas
  }
  
  let total = 0.0;
  let lojas_ = [];
  lojas.forEach((loja) => {
    const kitObj = kits.find((kit_) => kit_.uuid === kit);
    total = 0.0;
    kitObj.materiais_do_kit.forEach((materialDoKit) => {
      total +=
        parseFloat(
          loja.proponente.ofertas_de_materiais.find(
            (oferta) => oferta.item === materialDoKit.material.nome
          ).preco
        ) * materialDoKit.unidades;
    });
    loja.total_materiais = total.toFixed(2).toString().replace(".", ",");
    if (loja.total_materiais !== "0,00") {
      lojas_.push(loja);
    }
  });
  return lojas_;
};

export const encontrarUnidades = (kit, kits, materialEscolar) => {
  const kitObj = kits.find((kit_) => kit_.uuid === kit);
  const material = kitObj.materiais_do_kit.find(
    (material_) => material_.material.nome === materialEscolar.item
  );
  return material.unidades;
};

export const sortByDistance = (lista) => {
  return lista.sort((a, b) => {
    if (parseFloat(a["distancia"]) < parseFloat(b["distancia"])) return -1;
    else if (parseFloat(a["distancia"]) > parseFloat(b["distancia"])) return 1;
    return 0;
  });
};

export const sortByParam = (lista, param, limiteTamanho=10) => {
  return sortByDistance(lista)
    .splice(0, limiteTamanho)
    .sort((a, b) => {
      if (param === "distancia" || param === "total_materiais") {
        if (parseFloat(a[param]) < parseFloat(b[param])) return -1;
        else if (parseFloat(a[param]) > parseFloat(b[param])) return 1;
        return 0;
      } else if (param === "nome_fantasia") {
        if (a[param].toUpperCase() < b[param].toUpperCase()) return -1;
        else if (a[param].toUpperCase() > b[param].toUpperCase()) return 1;
        return 0;
      } else {
        if (
          parseFloat(
            a.proponente.ofertas_de_materiais.find(
              (material) => material.item === param
            )
              ? a.proponente.ofertas_de_materiais.find(
                  (material) => material.item === param
                ).preco
              : 99
          ) <
          parseFloat(
            b.proponente.ofertas_de_materiais.find(
              (material) => material.item === param
            )
              ? b.proponente.ofertas_de_materiais.find(
                  (material) => material.item === param
                ).preco
              : 99
          )
        )
          return -1;
        else if (
          parseFloat(
            a.proponente.ofertas_de_materiais.find(
              (material) => material.item === param
            )
              ? a.proponente.ofertas_de_materiais.find(
                  (material) => material.item === param
                ).preco
              : 99
          ) >
          parseFloat(
            b.proponente.ofertas_de_materiais.find(
              (material) => material.item === param
            )
              ? b.proponente.ofertas_de_materiais.find(
                  (material) => material.item === param
                ).preco
              : 99
          )
        )
          return 1;
        return 0;
      }
    });
};
