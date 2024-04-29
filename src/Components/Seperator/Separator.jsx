import React from "react";

const Separator = ({ children, className }) => {
  return (
    <div className="d-flex align-items-center my-3">
      <div className="flex-grow-1 border-top"></div>
      <div className={"px-2 "+ className}>{children}</div>
      <div className="flex-grow-1 border-top"></div>
    </div>
  );
}

export default Separator;