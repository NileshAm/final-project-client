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

  let { Discount, Name, Rating, Image, ID } = data;
  const navigate = useNavigate();
  return (
    <div
      className={cls()}
      onClick={() => {
        if (!admin) {
          navigate(`/product/${ID}`);
          if(window.location.pathname.split("/")[1] === "product"){
            window.location.reload()
          }
        }
      }}
    >
      <div className="border rounded w-100 img-back">
        <img src={Image} alt="Product" className="img" />
      </div>
      <div className="w-100 fs-5">{Name}</div>
      <div className="row">
        <StarRating Rating={Rating} starSize={15} className="rating-width" />
        {!admin && Discount !== 0 && (
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
              -{Discount}%
            </p>
          </div>
        )}
      </div>
      {admin ? <AdminView data={data} /> : <UserView data={data} />}
    </div>
  );
};

const UserView = ({ data }) => {
  let { Price, Discount } = data;
  return (
    <div
      className="row"
      style={Discount !== 0 ? { position: "relative", top: "-15px", zIndex:"-1" } : null}
    >
      <div className="col-6 fw-bold text-success ">
        {numberWithCommas(Discount ? (Price * (100 - Discount)) / 100 : Price)}
      </div>
      {Discount !== 0 ? (
        <div className="col">
          <div className="col-6 pt-1 fs-8 fw-bold text-danger ">
            {numberWithCommas(Discount && (Price * Discount) / 100)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const AdminView = ({ data }) => {
  const navigate = useNavigate();
  let { ID, Status } = data;
  return (
    <div>
      <span
        className={
          Status === 1 ? "text-success fw-bolder " : "text-danger fw-bolder "
        }
      >
        Current state : {Status === 1 ? "Active" : "Inactive"}
      </span>
      <button
        className="btn btn-success w-100 p-1 my-1"
        onClick={() => {
          navigate(`/admin/update?id=${ID}`);
        }}
      >
        Update Product
      </button>
      <button
        className="btn btn-warning w-100 p-1 my-1"
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          if(!confirm("Are you sure?")){
            return
          }
          const form = new FormData();
          form.append("id", ID);

          console.log(form);
          axios
            .post(getServerURL("/admin/product/statechange"), form, {})
            .then((res) => {
              if (res.status === 200) {
                window.location.reload()
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
          // eslint-disable-next-line no-restricted-globals
          if (!confirm("Are you sure you want to delete this product?")) {
            return;
          }
          axios
            .delete(getServerURL(`/admin/product/delete?id=${ID}`))
            .then((res) => {
              if (res.status === 200) {
                alert("Deleted");
                window.location.reload()
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
