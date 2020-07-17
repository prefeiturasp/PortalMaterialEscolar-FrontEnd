import { API_URL } from "../config";

export const getAPIVersion = async () => {
  const url = `${API_URL}/api-version/`;
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
      return { data: data.API_Version, status: status };
    })
    .catch((error) => {
      return error;
    });
};
