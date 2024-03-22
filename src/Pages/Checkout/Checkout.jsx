import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router";
import getServerURL from "../../Utils/getServerURL";

import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  let param = useParams();

  const isSuccess = param.state === "success";
  axios.defaults.withCredentials = true
  if (param.method === "online" ) {
    if (param.state === "success") {

      axios
        .post(getServerURL("/checkout/online/verify"), {})
        .then((res) => {
          console.log(res);
        });
    } else if (param.state === "cancel") {
      axios
        .post(getServerURL("/checkout/online/cancel"), {})
        .then((res) => {
          console.log(res);
        });
    }
  }
  return (
    <>
      <div className="container-fluid checkout d-flex justify-content-center align-items-center">
        <div className="row col-lg-4 col-md-6 col-sm-8 border rounded rounded-3 shadow d-flex justify-content-center p-3">
          <div
            className={
              "col col-3 acpect-1 rounded-circle d-flex justify-content-center align-items-center " +
              (isSuccess ? "bg-success" : "bg-danger")
            }
          >
            <i
              className={
                "bi text-light fs-1 px-4 " +
                (isSuccess ? "bi-bag-check-fill" : "bi-bag-x-fill")
              }
            ></i>
          </div>
          <div
            className={
              "d-flex justify-content-center fs-3 fw-bold mt-3 text-align-center " +
              (isSuccess ? "text-success" : "text-danger")
            }
          >
            {isSuccess ? "Order Placed Successfully" : "Order cancelled"}
          </div>
          {isSuccess && (
            <div className="d-flex justify-content-center text-align-center mt-2">
              Pick up your order from {/*eslint-disable-next-line*/}
              <a
                href="https://www.google.com/maps/place/Katugastota+-+Kurunegala+-+Puttalam+Hwy,+Kurunegala/@7.4877034,80.3640931,48m/data=!3m1!1e3!4m6!3m5!1s0x3ae33a1e41f6505b:0x178cfd3ffe329ccf!8m2!3d7.4876812!4d80.3641685!16s%2Fg%2F11b8v6ztwd?entry=ttu"
                target="_blank"
                className="bi bi-geo-alt"
              >
                <i className="">Store</i>
              </a>
            </div>
          )}
          <div className="d-flex justify-content-center  mt-2">
            <button
              className={
                "btn mt-2 " +
                (isSuccess ? "btn-outline-success" : "btn-outline-danger")
              }
              onClick={() => {
                let url = "/cart";
                if (isSuccess) {
                  url = "/";
                }
                navigate(url);
              }}
            >
              <i className="bi bi-arrow-left fw-bolder"></i> Back to{" "}
              {isSuccess ? "Home" : "Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
