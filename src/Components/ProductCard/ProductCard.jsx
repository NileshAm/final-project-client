import React from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./ProductCard.css";

import StarRating from "../StarRating/StarRating";
import axios from "axios";
import getServerURL from "../../Utils/getServerURL";
import numberWithCommas from "../../Utils/numberWithCommas";

const ProductCard = ({ data, admin }) => {
  let cls = () => {
    let cls =
      "col-12 col-sm-4 col-md-3 col-lg-2 border p-2 rounded-3 shadow-sm m-1 ";
    if (!admin) {
      cls = cls + "product-card";
    }
    return cls;
  };

  let { discount, name, rating, img, url } = data;
  const navigate = useNavigate();
  return (
    <div
      className={cls()}
      onClick={() => {
        if (!admin) {
          navigate(`/product?id=${url}`);
        }
      }}
    >
      <div className="border rounded w-100 img-back">
        <img src={img} alt="Product" className="img" />
      </div>
      <div className="w-100 fs-5">{name}</div>
      <div className="row">
        <StarRating Rating={rating} starSize={15} className="rating-width" />
        {!admin && discount !== 0 && (
          <div style={{ width: "47%", height: "80%", zIndex:"-1"  }}>
            <svg width={60} viewBox="0 0 252 96" fill="none">
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
            </svg>
            <p
              style={{ position: "relative", bottom: "22px"}}
              className="fs-7 fw-bolder text-light ps-2 m-0"
            >
              -{discount}%
            </p>
          </div>
        )}
      </div>
      {admin ? <AdminView data={data} /> : <UserView data={data} />}
    </div>
  );
};

const UserView = ({ data }) => {
  let { price, discount } = data;
  return (
    <div
      className="row"
      style={discount !== 0 ? { position: "relative", top: "-15px", zIndex:"-1" } : null}
    >
      <div className="col-6 fw-bold text-success ">
        {numberWithCommas(discount ? (price * (100 - discount)) / 100 : price)}
      </div>
      {discount !== 0 ? (
        <div className="col">
          <div className="col-6 pt-1 fs-8 fw-bold text-danger ">
            {numberWithCommas(discount && (price * discount) / 100)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const AdminView = ({ data }) => {
  const navigate = useNavigate();
  let { url, status } = data;
  return (
    <div>
      <span
        className={
          status === 1 ? "text-success fw-bolder " : "text-danger fw-bolder "
        }
      >
        Current state : {status === 1 ? "Active" : "Inactive"}
      </span>
      <button
        className="btn btn-success w-100 p-1 my-1"
        onClick={() => {
          navigate(`/admin/edit?id=${url}`);
        }}
      >
        Update Product
      </button>
      <button
        className="btn btn-warning w-100 p-1 my-1"
        onClick={() => {
          const form = new FormData();
          form.append("id", url);

          console.log(form);
          axios
            .post(getServerURL("/admin/product/statechange"), form, {})
            .then((res) => {
              if (res.status === 200) {
                alert("changed");
              } else {
                alert("error occured");
              }
            })
            .catch((e) => {
              alert(e);
            });
        }}
      >
        Change View State
      </button>
      <button
        className="btn btn-danger w-100  p-1 my-1"
        onClick={() => {
          axios
            .delete(getServerURL(`/admin/product/delete?id=${url}`))
            .then((res) => {
              if (res.status === 200) {
                alert("Deleted");
              } else {
                alert("error occured");
              }
            })
            .catch((e) => {
              alert(e);
            });
        }}
      >
        Delete Product
      </button>
    </div>
  );
};

export default ProductCard;
