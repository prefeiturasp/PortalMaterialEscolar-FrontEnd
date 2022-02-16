import { getNameFromLabel } from "./components/TabelaPrecos/helpers";

export const formatarPayloadCadastro = (payload) => {
  payload.ofertas_de_materiais = [];
  payload.lojas = payload.lojas.map((loja) => {
    if (loja.comprovante_end && loja.comprovante_end.length) {
      loja.comprovante_end = loja.comprovante_end[0].arquivo;
    } else {
      delete loja.comprovante_end;
    }
    return loja;
  });
  return payload;
};

export const validarCadastro = (payload) => {
  let lojas = [];
  let erro = false;
  payload.lojas.forEach((loja) => {
    if (
      lojas.find(
        (loja_) => loja_.cep === loja.cep && loja_.numero === loja.numero
      ) !== undefined
    ) {
      erro = "Não são permitidas duas lojas com mesmo CEP e número";
    } else {
      lojas.push(loja);
    }
  });
  return erro;
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
  });
  empresa.kits.forEach((kit) => {
    empresa[kit.uuid] = true;
  });
  return empresa;
};

export const formataEmpresa = (empresa) => {
  empresa = addCidadeEstadoSP(empresa);
  empresa = getTabelaPrecosValues(empresa);
  return empresa;
};
