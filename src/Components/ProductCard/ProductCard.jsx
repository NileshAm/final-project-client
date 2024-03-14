import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./ProductCard.css";

import img from "../../temp/Galaxy-S23-Ultra-Green.jpg";
import StarRating from "../StarRating/StarRating";
const ProductCard = () => {
  return (
    <div className="col-12 col-sm-4 col-md-3 col-lg-2 border p-2 rounded-3 shadow-sm product-card" onClick={()=>{alert("redirect")}}>
      <div className="border rounded w-100">
        <img src={img} alt="Product" className="img" />
      </div>
      <div className="w-100 fs-5">Samsung Galxy S23 Ultra</div>
      <StarRating Rating={2.5} starSize={15} className="rating-width" />
      <div className="row">
        <div className="col-6 fw-bold text-success ">
          LKR.
          <br />
          300,000.00
        </div>
        <div className="col">
          <div className="col-6 pt-1 fs-8 fw-bold text-danger ">
            LKR.30,000.00
          </div>
          <div className="bg-danger text-light d-flex justify-content-center my-2 mx-2 rounded-2 shadow-sm fs-7 fw-bolder ">-10%</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
