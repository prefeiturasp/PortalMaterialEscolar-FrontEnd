import React from "react";

export const between = (x, min, max) => {
  return x >= min && x <= max;
};

export const htmlTextToDiv = (tipo) => {
  return <div dangerouslySetInnerHTML={{ __html: tipo.nome }} />;
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function readerFile(file) {
  let result_file = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const re = /(?:\.([^.]+))?$/;
      const base64 = reader.result.split("base64,")[1];
      return resolve({
        arquivo: `data:${file.type}/${re.exec(file.name)[1]};base64,${base64}`,
      });
    };
    reader.readAsDataURL(file);
  });
  return result_file;
}

export const getKey = (obj) => {
  return Object.keys(obj)[0];
};

export const getError = (obj) => {
  let result = "Erro";
  if (!obj[getKey(obj)]) {
    return "Erro";
  } else if (
    (obj[getKey(obj)][0] !== undefined &&
      typeof obj[getKey(obj)][0] !== "string") ||
    typeof obj[getKey(obj)] !== "string"
  ) {
    result = getError(obj[getKey(obj)]);
  } else {
    if (typeof obj[getKey(obj)] === "string") return obj[getKey(obj)];
    else return obj[getKey(obj)][0];
  }
  return result;
};

export const formatarParaMultiselect = (lista) => {
  return lista.map((element) => {
    return {
      value: element.nome,
      label: element.nome,
    };
  });
};

export const formatarParaSelect = (lista) => {
  return lista.map((element) => {
    return {
      nome: element,
      uuid: element,
    };
  });
};

export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const STATUS_DICT = {
  INSCRITO: "Inscrição finalizada, em processo de credenciamento",
  CREDENCIADO: "Credenciado",
  EM_PROCESSO: "Em processo de inscrição, finalize o seu cadastro",
  PENDENTE: "Pendente credenciamento",
  ALTERADO: "Pendente validação de alteração"
};

export const getStatus = (status) => {
  return STATUS_DICT[status] || status;
};

export const getCNPJ = () => {
  return localStorage.getItem("cnpj");
};

export const getRazaoSocial = () => {
  return localStorage.getItem("razao_social");
};
