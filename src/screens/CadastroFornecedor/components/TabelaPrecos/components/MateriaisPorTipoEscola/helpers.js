export const getTotal = (materiais, values) => {
  console.log(materiais, values);
  let total = 0.0;
  materiais.forEach((material) => {
    if (values[material.value]) {
      total += material.quantidade * parseFloat(values[material.value]);
    }
  });
  return total.toFixed(2).toString().replace(".", ",");
};
