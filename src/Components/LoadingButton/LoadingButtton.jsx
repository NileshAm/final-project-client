import React, { useState } from "react";

export const LoadingButtton = ({
  onClick,
  className,
  normalContent,
  loadingContent,
  disabled
}) => {
  const [loadingState, setLoadingState] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoadingState(true);
        await onClick();
        setLoadingState(false);
      }}
      className={className}
      disabled={loadingState || disabled}
    >
      <div className=" ">
        {loadingState ? (
          <div className="d-flex justify-content-center align-items-center">
            <div class="spinner-border spinner-border-sm" role="status"></div>
            <div className="ms-2">{loadingContent}</div>
          </div>
        ) : (
          <div>{normalContent}</div>
        )}
      </div>
    </button>
  );
};
