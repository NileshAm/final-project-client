import React from "react";
import img from "./NotFound.svg";

const NotFound = () => {
  return (
    <div className="container-fluid row p-2">
      <div className="col-12 fs-1 fw-bold text-primary text-align-center mb-md-0 mb-5 mt-md-0 mt-5">
        Page Not Found
      </div>
      <div className="col col-12 d-flex justify-content-center mt-md-4 mt-5 mb-md-0 mb-4">
        <img
          src={img}
          alt="not found"
          width={500}
          className="col-md-6 col-12"
        />
      </div>
      <div className="col-12 d-flex justify-content-center">
        <a
          className="btn btn-outline-primary col-md-3 col-12 mt-md-4 mt-5"
          href="/"
        >
          <i class="bi bi-arrow-left"></i> Go back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
