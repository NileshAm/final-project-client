import React from "react";
import { useNavigate, useParams } from "react-router";

const Checkout = () => {
  const navigate = useNavigate();
  let param = useParams();

  return (
    <>
      <h1>{param.state}</h1>
      <button
        className="btn btn-outline-danger"
        onClick={() => {
          navigate("/cart");
        }}
      >
        Back to cart
      </button>
    </>
  );
};

export default Checkout;
