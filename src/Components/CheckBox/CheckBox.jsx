import React from "react";

export const CheckBox = ({
  label,
  className,
  hidden,
  defaultChecked,
  value,
  id,
  onChange,
}) => {
  return (
    <div className={className} hidden={hidden}>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        value={value}
        name={id}
        id={id}
        onChange={onChange}
      />
      <label className="ms-1">{label}</label>
    </div>
  );
};
