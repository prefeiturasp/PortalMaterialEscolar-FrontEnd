import React, { useEffect } from "react";
import "./style.scss";

export const ArquivoExistente = (props) => {
  useEffect(() => {}, [props]);
  return (
    <div className="file-existent pt-3">
      <div className="label">{props.label}</div>
      <div className="success-message">Arquivo enviado com sucesso!</div>
      {props.arquivo.data_validade && (
        <div className="pb-3">
          <strong>Data de validade: </strong>
          {props.arquivo.data_validade.split("-").reverse().join("/")}
        </div>
      )}
      <a target="blank" href={props.arquivo.arquivo || props.arquivo}>
        Visualizar arquivo
      </a>
      {props.proponenteStatus === "EM_PROCESSO" && (
        <span
          onClick={() =>
            props.lojaUuid
              ? props.removeAnexo(props.lojaUuid)
              : props.removeAnexo(props.arquivo.uuid)
          }
          className="delete"
        >
          x
        </span>
      )}
    </div>
  );
};
