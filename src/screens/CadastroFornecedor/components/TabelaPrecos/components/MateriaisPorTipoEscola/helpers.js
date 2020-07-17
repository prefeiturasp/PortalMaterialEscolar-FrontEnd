export const getTotal = (materiais, values) => {
  let total = 0.0;
  materiais.forEach((material) => {
    if (values[material.value]) {
      total +=
        material.quantidade *
        parseFloat(values[material.value].replace(",", "."));
    }
  });
  return total.toFixed(2).toString().replace(".", ",");
};

export const getLabelTotalItens = (materiaisEscolhidos, total) => {
  if (materiaisEscolhidos === 0) {
    return "Kit não disponibilizado";
  } else if (materiaisEscolhidos < total) {
    return "Disponibilização parcial do kit";
  } else {
    return "Disponibilização total do kit";
  }
};
