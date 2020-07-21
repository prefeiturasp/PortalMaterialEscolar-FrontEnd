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
      if (param === "distancia" || param === "total_uniformes") {
        if (parseFloat(a[param]) < parseFloat(b[param])) return -1;
        else if (parseFloat(a[param]) > parseFloat(b[param])) return 1;
        return 0;
      } else {
        if (a[param].toUpperCase() < b[param].toUpperCase()) return -1;
        else if (a[param].toUpperCase() > b[param].toUpperCase()) return 1;
        return 0;
      }
    });
};
