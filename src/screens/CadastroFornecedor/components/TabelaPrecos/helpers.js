export const formataTabelaPrecos = (values) => {
  const ofertas_de_materiais = [];
  if (values.agenda_educacao_infantil_check) {
    ofertas_de_materiais.push({
      nome: "Agenda Educação Infantil",
      valor: values.agenda_educacao_infantil,
    });
  }
  values.ofertas_de_materiais = ofertas_de_materiais;
  return values;
};
