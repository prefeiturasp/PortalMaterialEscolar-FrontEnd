import PropTypes from "prop-types";
import React from "react";
import { InputErroMensagem } from "../Input/InputErroMensagem";
import { HelpText } from "components/HelpText";
import "./style.scss";

export const Select = (props) => {
  const {
    className,
    disabled,
    helpText,
    input,
    label,
    meta,
    name,
    naoDesabilitarPrimeiraOpcao,
    onChange,
    options,
    required,
    width,
    labelClassName,
    primeiraOpcao,
  } = props;
  return (
    <div className="select">
      {label && [
        required && (
          <span key={0} className="required-asterisk">
            *
          </span>
        ),
        <label
          key={1}
          htmlFor={name}
          className={`${labelClassName || undefined} col-form-label`}
        >
          {label}
        </label>,
      ]}
      <select
        {...input}
        className={`form-control ${className} ${
          meta && meta.touched && meta.error && "invalid-field"
        }`}
        disabled={disabled}
        data-cy={label}
        onChange={input ? input.onChange : onChange}
        name={name}
        onFocus={(e) =>
          e.relatedTarget &&
          e.relatedTarget.nodeName === "BUTTON" &&
          window.scrollBy(0, -30)
        }
        required={required}
        style={width && { width: width - 12 }}
      >
        <option value={null}>{primeiraOpcao || "Selecione"}</option>
        {options.map((e, key) => {
          return (
            <option
              key={key}
              value={e.uuid || e.nome}
              disabled={
                e.disabled || (key === 0 && !naoDesabilitarPrimeiraOpcao)
              }
            >
              {e.nome}
            </option>
          );
        })}
      </select>
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string,
      uuid: PropTypes.string,
      disable: PropTypes.bool,
      selected: PropTypes.bool,
    })
  ),
  name: PropTypes.string,
};
Select.defaultProps = {
  naoDesabilitarPrimeiraOpcao: false,
  options: [{ nome: "Selecione", uuid: "" }],
  disabled: false,
};

export default Select;
