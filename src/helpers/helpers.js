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
