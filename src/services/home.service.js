
export const getAPIVersion = async () => {
  const url = `https://api.github.com/repos/prefeiturasp/PortalMaterialEscolar-BackEnd/releases/latest`;
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
      return { data: data.name, status: status };
    })
    .catch((error) => {
      return error;
    });
};

export const getFrontVersion = async () => {
  const url = `https://api.github.com/repos/prefeiturasp/PortalMaterialEscolar-FrontEnd/releases/latest`;
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
      return { data: data.name, status: status };
    })
    .catch((error) => {
      return error;
    });
};
