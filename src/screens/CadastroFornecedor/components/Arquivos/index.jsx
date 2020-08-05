import React, { useState, useEffect, useCallback } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field } from "react-final-form";
import { FileUpload } from "components/Input/FileUpload";
import { required } from "helpers/validators";
import { ArquivoExistente } from "./ArquivoExistente";
import { htmlTextToDiv } from "helpers/helpers";
import Botao from "components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "components/Botao/constants";
import { getTiposDocumentos } from "services/tiposDocumentos.service";
import { setAnexo, setFachadaLoja, deleteAnexo } from "services/anexo.service";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import { getProponente, concluirCadastro } from "services/cadastro.service";
import { verificarSeFaltamArquivos } from "./helpers";
import { OnChange } from "react-final-form-listeners";
import { formataEmpresa } from "screens/CadastroFornecedor/helpers";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import "./style.scss";

export const Arquivos = ({ empresa, setEmpresa }) => {
  const [algumUploadEmAndamento, setAlgumUploadEmAndamento] = useState(false);
  const [tiposDocumentos, setTiposDocumentos] = useState(null);
  const [faltamArquivos, setFaltamArquivos] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadDocumentos = async () => {
      const response = await getTiposDocumentos();
      setTiposDocumentos(response.data);
    };
    loadDocumentos();
  }, []);

  useEffect(() => {
    if (tiposDocumentos) {
      setEmpresaEFaltaArquivos(empresa);
    }
  });

  const useForceUpdate = () => {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  };

  const forceUpdate = useForceUpdate();

  const setEmpresaEFaltaArquivos = (empresa) => {
    setEmpresa(formataEmpresa(empresa));
    setFaltamArquivos(verificarSeFaltamArquivos(empresa, tiposDocumentos));
  };

  const uploadFachadaLoja = async (e, uuidLoja, key) => {
    if (!e[0].arquivo.includes("image/")) {
      toastError("Formato de arquivo inválido");
    } else {
      const arquivoAnexo = {
        foto_fachada: e[0].arquivo,
      };
      let empresa_ = empresa;
      empresa_.lojas[key].uploadEmAndamento = true;
      setEmpresa(empresa_);
      setAlgumUploadEmAndamento(true);
      forceUpdate();
      setFachadaLoja(arquivoAnexo, uuidLoja).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Arquivo salvo com sucesso!");
          let empresa_ = empresa;
          empresa_.lojas[key].uploadEmAndamento = false;
          setEmpresa(empresa_);
          setAlgumUploadEmAndamento(false);
          getProponente(empresa.uuid).then((empresa) => {
            setEmpresaEFaltaArquivos(empresa.data);
          });
        } else {
          toastError("Erro ao dar upload no arquivo");
          let empresa_ = empresa;
          empresa_.lojas[key].uploadEmAndamento = false;
          setEmpresa(formataEmpresa(empresa_));
          setAlgumUploadEmAndamento(false);
        }
      });
    }
  };

  const deleteFachadaLoja = async (uuidLoja) => {
    if (window.confirm("Deseja remover este anexo?")) {
      const arquivoAnexo = {
        foto_fachada: null,
      };
      setFachadaLoja(arquivoAnexo, uuidLoja).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Arquivo excluído com sucesso!");
          getProponente(empresa.uuid).then((empresa) => {
            setEmpresaEFaltaArquivos(empresa.data);
          });
        } else {
          toastError("Erro ao dar excluir no arquivo");
        }
      });
    }
  };

  const removeAnexo = async (uuidAnexo) => {
    if (window.confirm("Deseja remover este anexo?")) {
      deleteAnexo(uuidAnexo).then((response) => {
        if (response.status === HTTP_STATUS.NO_CONTENT) {
          toastSuccess("Arquivo removido com sucesso!");
          getProponente(empresa.uuid).then((empresa) => {
            setEmpresaEFaltaArquivos(empresa.data);
          });
        } else {
          toastError("Erro ao remover arquivo");
        }
      });
    }
  };

  const uploadAnexo = async (e, tipo, key) => {
    const arquivoAnexo = {
      ...e[0],
      tipo_documento: tipo.id,
      proponente: empresa.uuid,
    };
    let tiposDocumentos_ = tiposDocumentos;
    tiposDocumentos_[key].uploadEmAndamento = true;
    setTiposDocumentos(tiposDocumentos_);
    setAlgumUploadEmAndamento(true);
    forceUpdate();
    setAnexo(arquivoAnexo).then((response) => {
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Arquivo salvo com sucesso!");
        let tiposDocumentos_ = tiposDocumentos;
        tiposDocumentos_[key].uploadEmAndamento = false;
        setTiposDocumentos(tiposDocumentos_);
        setAlgumUploadEmAndamento(false);
        getProponente(empresa.uuid).then((empresa) => {
          setEmpresaEFaltaArquivos(empresa.data);
        });
      } else {
        toastError("Erro ao dar upload no arquivo");
        let tiposDocumentos_ = tiposDocumentos;
        tiposDocumentos_[key].uploadEmAndamento = false;
        setTiposDocumentos(tiposDocumentos_);
        setAlgumUploadEmAndamento(false);
      }
    });
  };

  const finalizarCadastro = () => {
    if (faltamArquivos) {
      toastError(
        "É preciso anexar todos os arquivos obrigatórios para finalizar seu cadastro"
      );
    } else if (empresa.kits.length === 0) {
      toastError("É preciso fornecer ao menos um kit");
    } else {
      concluirCadastro(empresa.uuid).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          window.location.href = "/confirmacao-cadastro";
        } else {
          toastError("Erro ao finalizar cadastro");
        }
      });
    }
  };

  return (
    <div className="arquivos">
      <div className="card w-100 mt-2">
        <div className="card-body">
          <div className="card-title">Fachadas das Lojas/dos Estandes</div>
          {empresa &&
            empresa.lojas.map((loja, key) => {
              return !loja.foto_fachada ? (
                <div
                  className={`${
                    algumUploadEmAndamento && !loja.uploadEmAndamento
                      ? "set-opacity"
                      : undefined
                  } `}
                >
                  <Field
                    component={FileUpload}
                    name={`loja_${key}`}
                    disabled={algumUploadEmAndamento}
                    id={`${key}`}
                    key={key}
                    accept="image/*"
                    acceptCustom="image/png, image/jpg, image/jpeg"
                    className="form-control-file"
                    label={`${loja.nome_fantasia} - ${loja.endereco}`}
                    required
                    validate={required}
                    multiple={false}
                  />
                  <div className="campos-permitidos">
                    Formatos permitidos: .png, .jpg, .jpeg
                    <br />
                    Tamanho máximo: 5 MB
                  </div>
                  <OnChange name={`loja_${key}`}>
                    {async (value, previous) => {
                      if (value.length > 0) {
                        uploadFachadaLoja(value, loja.uuid, key);
                      }
                    }}
                  </OnChange>
                  {loja.uploadEmAndamento && (
                    <span className="font-weight-bold">
                      {`Upload de documento em andamento. `}
                      <span className="red-word">Aguarde</span>
                      <span className="blink">...</span>
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  <ArquivoExistente
                    label={`${loja.nome_fantasia} - ${loja.endereco}`}
                    arquivo={loja.foto_fachada}
                    lojaUuid={loja.uuid}
                    proponenteStatus={empresa && empresa.status}
                    removeAnexo={deleteFachadaLoja}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="card w-100 mt-2">
        <div className="card-body">
          <div className="card-title">Documentos Anexos</div>
          {tiposDocumentos ? (
            tiposDocumentos.map((tipo, key) => {
              return empresa &&
                empresa.arquivos_anexos.find(
                  (arquivo) => arquivo.tipo_documento === tipo.id
                ) ? (
                <div>
                  <ArquivoExistente
                    label={htmlTextToDiv(tipo)}
                    arquivo={empresa.arquivos_anexos.find(
                      (arquivo) => arquivo.tipo_documento === tipo.id
                    )}
                    proponenteStatus={empresa && empresa.status}
                    removeAnexo={removeAnexo}
                  />
                </div>
              ) : empresa && empresa.status !== "EM_PROCESSO" ? (
                <div className="no-file-end-signup pt-3">
                  <div className="label">{htmlTextToDiv(tipo)}</div>
                  <div>
                    Seu cadastro foi finalizado e você não pode mais enviar este
                    anexo.
                  </div>
                </div>
              ) : (
                <div
                  className={`${
                    algumUploadEmAndamento && !tipo.uploadEmAndamento
                      ? "set-opacity"
                      : undefined
                  } `}
                >
                  <Field
                    component={FileUpload}
                    name={`arqs_${key}`}
                    disabled={algumUploadEmAndamento}
                    id={`${key}`}
                    key={key}
                    accept=".pdf, .png, .jpg, .jpeg, .zip"
                    acceptCustom="image/png, image/jpg, image/jpeg, application/zip, application/pdf"
                    className="form-control-file"
                    label={htmlTextToDiv(tipo)}
                    resetarFile={tipo.resetarFile}
                    required={tipo.obrigatorio}
                    validate={tipo.obrigatorio && required}
                    multiple={false}
                  />
                  <div className="campos-permitidos">
                    Formatos permitidos: .png, .jpg, .jpeg, .zip, .pdf
                    <br />
                    Tamanho máximo: 5 MB
                  </div>
                  <OnChange name={`arqs_${key}`}>
                    {async (value, previous) => {
                      if (value.length > 0) {
                        uploadAnexo(value, tipo, key);
                      }
                    }}
                  </OnChange>
                  {tipo.uploadEmAndamento && (
                    <span className="font-weight-bold">
                      {`Upload de documento em andamento. `}
                      <span className="red-word">Aguarde</span>
                      <span className="blink">...</span>
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div>Erro ao carregar Tipos de Documentos para anexar.</div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-right mt-3 mb-3">
          {empresa && empresa.status === "EM_PROCESSO" && (
            <Botao
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.BLUE}
              onClick={() => finalizarCadastro()}
              texto="Finalizar"
            />
          )}
        </div>
      </div>
    </div>
  );
};
