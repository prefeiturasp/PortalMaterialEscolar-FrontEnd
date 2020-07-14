import PropTypes from "prop-types";
import React from "react";
import { InputErroMensagem } from "../InputErroMensagem";
import { HelpText } from "components/HelpText";
import "../style.scss";

export const InputText = (props) => {
  const {
    acrescentarAppend,
    className,
    disabled,
    esconderAsterisco,
    helpText,
    input,
    label,
    labelClassName,
    meta,
    min,
    max,
    name,
    placeholder,
    required,
    title,
    maxlength,
    pattern,
    icone,
    toUppercaseActive,
  } = props;
  return (
    <div className={`input ${icone && "icon"}`}>
      {label && [
        required && !esconderAsterisco && (
          <span key={0} className="required-asterisk">
            *
          </span>
        ),
        <label
          key={1}
          htmlFor={name}
          className={`col-form-label ${labelClassName}`}
        >
          {label}
        </label>,
      ]}
      <input
        {...input}
        className={`form-control ${className} ${
          meta &&
          meta.touched &&
          (meta.error || meta.warning) &&
          "invalid-field"
        }`}
        disabled={disabled}
        autoComplete="new-password"
        min={min}
        max={max}
        name={name}
        value={input.value}
        data-cy={input.name}
        placeholder={placeholder}
        required={required}
        onFocus={(e) =>
          e.relatedTarget &&
          e.relatedTarget.nodeName === "BUTTON" &&
          window.scrollBy(0, -30)
        }
        type={input.type}
        title={title}
        pattern={pattern}
        maxLength={maxlength}
        onInput={(e) => {
          e.target.value = toUppercaseActive
            ? e.target.value.toUpperCase()
            : e.target.value;
        }}
      />
      {acrescentarAppend && (
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon1">
            {acrescentarAppend}
          </span>
        </div>
      )}
      {icone && <i className={icone} />}
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};

InputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  esconderAsterisco: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

InputText.defaultProps = {
  className: "",
  disabled: false,
  esconderAsterisco: false,
  helpText: "",
  input: {},
  label: "",
  labelClassName: "",
  meta: {},
  name: "",
  placeholder: "",
  required: false,
  type: "text",
};

export default InputText;
