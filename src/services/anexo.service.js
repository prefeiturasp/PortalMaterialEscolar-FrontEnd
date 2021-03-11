import { API_URL } from "../config";
import { getToken } from "./auth.service";

export const setAnexo = async (payload) => {
  const url = `${API_URL}/anexos/`;
  let status = 0;
  let header = {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
  }

  const token = getToken();
  if (token !== undefined) {
    header["Authorization"] = `JWT ${token}`;
  }
  
  return fetch(url, {
    headers: header,
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

export const deleteAnexo = async (uuid) => {
  const url = `${API_URL}/anexos/${uuid}/`;
  let status = 0;
  let header = {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
  }

  const token = getToken();
  if (token !== undefined) {
    header["Authorization"] = `JWT ${token}`;
  }

  return fetch(url, {
    headers: header,
    method: "DELETE",
  })
    .then((response) => {
      status = response.status;
      return response.text();
    })
    .then((data) => {
      return Promise.resolve(data ? JSON.parse(data) : { status: status });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const setFachadaLoja = async (payload, uuid) => {
  const url = `${API_URL}/lojas/${uuid}/`;
  let status = 0;
  
  let header = {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
  }

  const token = getToken();
  if (token !== undefined) {
    header["Authorization"] = `JWT ${token}`;
  }

  return fetch(url, {
    headers: header,
    method: "PATCH",
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
