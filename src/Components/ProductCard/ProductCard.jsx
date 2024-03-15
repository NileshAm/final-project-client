import React from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./ProductCard.css";

import StarRating from "../StarRating/StarRating";
const ProductCard = ({ data }) => {
  let { name, rating, price, discount, img, url } = data;

  const navigate = useNavigate();
  return (
    <div
      className="col-12 col-sm-4 col-md-3 col-lg-2 border p-2 rounded-3 shadow-sm product-card m-1"
      onClick={() => {
        navigate(`/product?id=${url}`);
      }}
    >
      <div className="border rounded w-100 img-back">
        <img src={img} alt="Product" className="img" />
      </div>
      <div className="w-100 fs-5">{name}</div>
      <StarRating Rating={rating} starSize={15} className="rating-width" />
      <div className="row">
        <div className="col-6 fw-bold text-success ">
          LKR.
          <br />
          {discount ? (price * (100 - discount)) / 100 : price}
        </div>
        {discount !== 0 ? (
          <div className="col">
            <div className="col-6 pt-1 fs-8 fw-bold text-danger ">
              LKR.{discount && (price * discount) / 100}
            </div>
            <div >

        <svg
          width={60}
          viewBox="0 0 252 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{position:"absolute"}}
        >
          <g id="Group 1">
            <g id="Label">
              <ellipse
                id="Ellipse 1"
                cx="32.5529"
                cy="48.0207"
                rx="31.722"
                ry="47.1763"
                fill="#F52A2A"
              />
              <path
                id="Subtract"
                d="M196.856 48.0207L251.903 0.844406H32.5529V95.197H251.903L196.856 48.0207Z"
                fill="#F52A2A"
              />
            </g>
          </g>
        </svg>
        <p style={{position:"absolute"}} className="fs-7 fw-bolder text-light ps-2" >-{discount}%</p>
        </div>
          </div>
        ) : null}
        
      </div>
    </div>
  );
};

export default ProductCard;
