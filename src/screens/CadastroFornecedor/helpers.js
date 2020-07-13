export const formatarPayloadCadastro = (payload) => {
  payload.ofertas_de_materiais = [];
  return payload;
};

export const addCidadeEstadoSP = (empresa) => {
  empresa.lojas.map((loja) => {
    loja.cidade = "São Paulo";
    loja.uf = "SP";
    return loja;
  });
  return empresa;
};
