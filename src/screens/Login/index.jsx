import React, { Fragment, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { Link, useHistory } from "react-router-dom";
import { required } from "helpers/validators";
import InputText from "components/Input/InputText";
import logoSME from "assets/img/logo-sme.svg";
import authService from "services/auth.service";
import { atualizarSenha } from "services/perfil.service";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import "./style.scss";

export const Login = () => {
  const [exibirResetSenha, setExibirResetSenha] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const history = useHistory();

  const resetarSenha = (values) => {
    atualizarSenha(usuario.id, usuario.token, values).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Senha atualizada com sucesso");
        setTimeout(() => {
          history.push("/");
        }, 1500);
      } else {
        toastError("Houve um erro ao atualizar sua senha");
      }
    });
  };

  const onSubmit = (values) => {
    const { email, password } = values;
    if (email && password) {
      authService.login(email, password).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setUsuario(response.data);
          if (!response.data.last_login) {
            setExibirResetSenha(true);
          } else {
            history.push("/");
          }
        }
      });
    }
  };

  return (
    <div>
      <div className="login-bg" />
      <div className="right-half">
        <div className="container my-auto">
          <div className="logo-sigpae">
            Login - Fornecedores de Material Escolar
          </div>
          <div className="form">
            <Form
              onSubmit={onSubmit}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  {!exibirResetSenha && (
                    <Fragment>
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="E-mail"
                        name="email"
                        placeholder={"Seu e-mail"}
                        required
                        type="text"
                        validate={required}
                      />
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="Senha"
                        name="password"
                        placeholder={"******"}
                        required
                        type="password"
                        validate={required}
                      />
                      <Botao
                        className="mt-3 col-12"
                        style={BUTTON_STYLE.BLUE}
                        texto="Acessar"
                        type={BUTTON_TYPE.SUBMIT}
                      />
                    </Fragment>
                  )}
                  {exibirResetSenha && (
                    <Fragment>
                      É necessário alterar sua senha para o primeiro acesso.
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="Senha"
                        name="senha1"
                        placeholder={"******"}
                        required
                        type="password"
                        validate={required}
                      />
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="Confirmar senha"
                        name="senha2"
                        placeholder={"******"}
                        required
                        type="password"
                        validate={required}
                      />
                      <Botao
                        className="mt-3 col-12"
                        style={BUTTON_STYLE.BLUE}
                        texto="Resetar senha"
                        type={BUTTON_TYPE.BUTTON}
                        onClick={() => resetarSenha(values)}
                      />
                    </Fragment>
                  )}
                  <p className="mt-2 text-center">
                    <Link
                      className="hyperlink"
                      to="#"
                      data-cy="esqueci-senha"
                      onClick={() =>
                        this.setState({
                          componenteAtivo: "esqueci_senha",
                        })
                      }
                    >
                      Esqueci minha senha
                    </Link>
                  </p>
                </form>
              )}
            />
          </div>
          <div className="logo-prefeitura">
            <img src={logoSME} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
