import React from "react";

export const RadioBtn = ({
  id,
  value,
  label,
  onChange,
  hidden,
  defaultValue,
  className,
}) => {
  return (
    <div className={className} hidden={hidden}>
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
