import React from "react";

export const FormGroup = ({ label, name, className, type, onChange, defaultValue, disabled, children }) => {
  if (!type) {
    type = "text";
  }
  return (
    <div className={"form-group " + className}>
      <label>{label}</label>
      {children}
      <input
        type={type}
        className="form-control"
        placeholder={"Enter your " + label.toLowerCase()}
        id={name}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        min={0}
      />
    </div>
  );
};
