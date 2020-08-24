import { API_URL } from "../config";
import { AUTH_TOKEN } from "./constants";

export const atualizarSenha = (uuid, confirmationKey, payLoad) => {
  const url = `${API_URL}/usuarios/atualizar-senha/${uuid}/${confirmationKey}/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payLoad),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};

export const atualizarSenhaLogado = (uuid, payLoad) => {
  const url = `${API_URL}/usuarios/${uuid}/atualizar-senha-logado/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payLoad),
    headers: AUTH_TOKEN,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};
