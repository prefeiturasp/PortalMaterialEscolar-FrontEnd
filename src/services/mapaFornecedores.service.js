import { API_URL } from "../config";
import Axios from "axios";
import { toastError } from "components/Toast/dialogs";

export const getLojasCredenciadas = async (latitude, longitude, payload) => {
  const url = `${API_URL}/lojas-credenciadas/lojas/?latitude=${latitude}&longitude=${longitude}`;
  let status = 0;
  return fetch(url, {
    headers: {
      "Accept-Language": "pt-br",
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
      return error;
    });
};

export const getLojasCredenciadasSemLatLong = () => {
  const url = `${API_URL}/lojas-credenciadas/`;
  let status = 0;
  return fetch(url, {
    headers: {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
    method: "GET",
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

export const getPDFLojasCredenciadas = () => {
  Axios({
    url: `${API_URL}/lojas-credenciadas/pdf-lojas-credenciadas/`,
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lojas-credenciadas.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch(() => {
      toastError("Erro ao baixar PDF. Tente novamente mais tarde");
    });
};
