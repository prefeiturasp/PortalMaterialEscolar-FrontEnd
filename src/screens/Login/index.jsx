import React from "react";
import { Form, Field } from "react-final-form";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { Link } from "react-router-dom";
import { required } from "helpers/validators";
import InputText from "components/Input/InputText";
import logoSME from "assets/img/logo-sme.svg";
import authService from "services/auth.service";
import "./style.scss";

export const Login = () => {
  const onSubmit = (values) => {
    const { email, password } = values;
    if (email && password) {
      authService.login(email, password);
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
