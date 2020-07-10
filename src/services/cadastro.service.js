import { API_URL } from "../config";

export const cadastroFornecedorStep1 = async (payload) => {
  const url = `${API_URL}/proponentes/`;
  let status = 0;
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error.json();
    });
};
