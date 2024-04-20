import React from "react";

import "./ErrorField.css";

const ErrorField = ({ children, className }) => {
  let isError = children === "" || children === null;
  console.log(isError);
  return (
    <div
      className={
        className +
        " bg-danger-subtle d-flex justify-content-center  rounded-3  p-1 error " +
        (isError ? "m-0 text-transparent hidden" : "mt-3 text-danger shown")
      }
    >
      {children}
    </div>
  );
};

export default ErrorField;
