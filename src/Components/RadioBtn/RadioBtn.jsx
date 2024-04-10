import React from "react";

export const RadioBtn = ({
  id,
  value,
  label,
  onChange,
  hidden,
  defaultValue,
}) => {
  return (
    <div className="col-3" hidden={hidden}>
      <input
        type="radio"
        name={id}
        id={id}
        value={value}
        className="m-1"
        onChange={onChange}
        defaultChecked={defaultValue}
      />
      <label hidden={hidden}>{label}</label>
    </div>
  );
};
