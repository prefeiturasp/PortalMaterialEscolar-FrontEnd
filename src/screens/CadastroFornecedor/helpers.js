import { getNameFromLabel } from "./components/TabelaPrecos/helpers";

export const formatarPayloadCadastro = (payload) => {
  payload.ofertas_de_materiais = [];
  return payload;
};

const addCidadeEstadoSP = (empresa) => {
  empresa.lojas.map((loja) => {
    loja.cidade = "São Paulo";
    loja.uf = "SP";
    return loja;
  });
  return empresa;
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const getTabelaPrecosValues = (empresa) => {
  empresa.ofertas_de_materiais.forEach((oferta) => {
    const key = getNameFromLabel(oferta.material.nome);
    empresa[key] = oferta.preco.toString().replace(".", ",");
    empresa[`${key}_check`] = true;
  });
  return empresa;
};

export const formataEmpresa = (empresa) => {
  empresa = addCidadeEstadoSP(empresa);
  empresa = getTabelaPrecosValues(empresa);
  return empresa;
};
