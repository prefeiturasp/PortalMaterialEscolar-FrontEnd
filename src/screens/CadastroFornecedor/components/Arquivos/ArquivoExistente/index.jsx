import React, { useEffect } from "react";
import moment from "moment";
import "./style.scss";

export const ArquivoExistente = (props) => {
  useEffect(() => {}, [props]);
  return (
    <div className="file-existent pt-3">
      <div className="label">{props.label}</div>
      <div className="success-message">Arquivo enviado com sucesso!</div>
      {props.arquivo.data_validade && (
        <div className="pb-3">
          <strong>Documento vence em: </strong>
          {moment(props.arquivo.data_validade).diff(moment(), "days") + 1} dias
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
