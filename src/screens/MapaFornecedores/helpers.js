import { TIPO_ESCOLA_MATERIAIS } from "screens/CadastroFornecedor/components/TabelaPrecos/components/MateriaisPorTipoEscola/constants";

export const getArrayMateriais = (kit) => {
  const materiais = [];
  TIPO_ESCOLA_MATERIAIS[kit].materiais.forEach((material) => {
    materiais.push(material.label);
  });
  return materiais;
};

export const acrescentaTotalMateriais = (lojas, materiaisSelecionados, kit) => {
  let total = 0.0;
  let lojas_ = [];
  lojas.forEach((loja) => {
    total = 0.0;
    let ofertas = loja.proponente.ofertas_de_materiais;
    if (materiaisSelecionados.length > 0) {
      ofertas = ofertas.filter((ofertaMaterial) =>
        materiaisSelecionados.includes(ofertaMaterial.item)
      );
    } else {
      ofertas = ofertas.filter((ofertaMaterial) =>
        getArrayMateriais(kit).includes(ofertaMaterial.item)
      );
    }
    ofertas.forEach((uniforme) => {
      total += parseFloat(uniforme.preco);
    });
    loja.total_materiais = total.toFixed(2).toString().replace(".", ",");
    if (loja.total_materiais !== "0,00") {
      lojas_.push(loja);
    }
  });
  return lojas_;
};

export const sortByDistance = (lista) => {
  return lista.sort((a, b) => {
    if (parseFloat(a["distancia"]) < parseFloat(b["distancia"])) return -1;
    else if (parseFloat(a["distancia"]) > parseFloat(b["distancia"])) return 1;
    return 0;
  });
};

export const sortByParam = (lista, param) => {
  return sortByDistance(lista)
    .splice(0, 10)
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
