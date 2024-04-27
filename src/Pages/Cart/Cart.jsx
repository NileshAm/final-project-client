import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import getServerURL from "../../Utils/getServerURL";
import "./Cart.css";
import numberWithCommas from "../../Utils/numberWithCommas";

import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import ErrorField from "Components/ErrorField/ErrorField";
import { LoadingButtton } from "Components/LoadingButton/LoadingButtton";
import Separator from "../../Components/Seperator/Separator";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  axios.get(getServerURL("/login")).then((res) => {
    console.log(res.data);
    if (!res.data.loggedIn) {
      navigate("/");
    }
  });

  useLayoutEffect(() => {
    axios.get(getServerURL(`/cart`)).then((res) => {
      setCartData(res.data);

      let tot = 0;
      let dis = 0;
      res.data.forEach((element) => {
        tot =
          tot +
          (element.Price * element.Quantity * (100 - element.Discount)) / 100;
        dis = dis + (element.Price * element.Quantity * element.Discount) / 100;
      });

      setTotal(tot);
      setDiscount(dis);
    });
  }, []);

  const onlinePay = () => {
    const form = new FormData();
    form.append(
      "successURL",
      encodeURIComponent(window.origin + "/checkout/online/success")
    );
    form.append(
      "cancelURL",
      encodeURIComponent(window.origin + "/checkout/online/cancel")
    );
    return axios
      .post(getServerURL("/checkout/online"), form, {})
      .then((res) => {
        if (res.data.completed) {
          console.log(res.data.url);
          window.location = res.data.url;
        }
      });
  };
  const bankPay = () => {
    const form = new FormData(document.forms[0]);
    if (form.get("image").name === "") {
      setError("Add the payment reciept below before submmiting");
      return;
    }
    return axios.post(getServerURL("/checkout/bank"), form, {}).then((res) => {
      if (res.data.code === 200) {
        navigate("/checkout/bank/success");
      } else {
        navigate("/checkout/bank/cancel");
      }
    });
  };

  return (
    <>
      <div className="row">
        <div className="col col-md-8 col-12">
          {cartData.length === 0 ? (
            <div className="d-flex col-12 justify-content-center fs-3 text-body-tertiary ">
              No cart items added
            </div>
          ) : (
            cartData.map((v, k) => {
              return <CartProduct product={v} key={k} />;
            })
          )}
        </div>
        <div className="col-md-4 col-12 border-left p-2 ps-3 mt-3 mt-md-0">
          <div className="row fs-2 text-success fw-bold">
            <div className="col-3">Total :</div>
            <div className="col-9">{" " + numberWithCommas(total)}</div>
          </div>
          <div className="row fs-5 text-danger fw-medium">
            <div className="col-3">Discount :</div>
            <div className="col-9">{" " + numberWithCommas(discount)}</div>
          </div>
          <hr />
          <form>
            <ErrorField className={"mb-2"}>{error}</ErrorField>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control rounded-bottom-0  "
              accept=".pdf,.png,.jpg"
              disabled={cartData.length === 0}
              onChange={() => {
                setError("");
              }}
            />
            <LoadingButtton
              className="btn btn-outline-success col-12 rounded-top-0 "
              disabled={cartData.length === 0 || error !== ""}
              normalContent={
                <>
                  <i className="bi bi-receipt me-2"></i>
                  <span>Submit receipt</span>
                </>
              }
              loadingContent={"Processing..."}
              onClick={() => {
                return bankPay();
              }}
            />
            <div className="text-warning fs-xs mt-2">
              *This method can take few bussiness for approval process.
              <br />
              *For instant reservations use{" "}
              <span
                className="link"
                onClick={() => {
                  onlinePay();
                }}
                disabled={cartData.length === 0}
              >
                Pay online
              </span>{" "}
              method
            </div>
          </form>
          <Separator>or</Separator>
          <LoadingButtton
            className="btn btn-outline-success col-12 mb-5 "
            onClick={() => {
              return onlinePay();
            }}
            disabled={cartData.length === 0}
            normalContent={
              <>
                <i className="bi bi-credit-card me-2"></i>
                <span>Pay Online</span>
              </>
            }
            loadingContent={"Proccessing..."}
          />
        </div>
      </div>
    </>
  );
};

const CartProduct = ({ product }) => {
  const changeCartProduct = (product, amount, deleted) => {
    let newQuantity = product.Quantity + amount;
    if (newQuantity !== 0 && newQuantity <= product.Stock) {
      const form = new FormData();
      console.log(product.CartID);
      form.append("cartID", product.CartID);
      form.append("productID", product.ProductID);
      form.append("quantity", newQuantity);
      form.append("delete", deleted);
      axios.post(getServerURL("/cart/edit"), form, {}).then((res) => {
        console.log(res);
        if (res.data.updateStatus) {
          window.location.reload();
        }
      });
    }
  };
  return (
    <div className="row col-11 border rounded-3 m-2 shadow-sm flex-row d-flex p-2 me-3">
      <img
        src={product.Image}
        alt=""
        className="col col-sm-2 col-12 border rounded-2"
      />
      <div className="col ms-2 col-sm-5 col-12 ">
        <div className="text-success fw-bolder fs-4 ">{product.Name}</div>
        <div className="f-row d-flex align-items-center ">
          <div className="col-6">
            <div className="text-danger fs-8">
              {numberWithCommas(product.Price)}
            </div>
            {product.Discount !== 0 && (
              <div className="text-light col-1 fs-8 bg-danger py-1 px-4 rounded-2 justify-content-center d-flex mt-2">
                -{product.Discount}%
              </div>
            )}
          </div>
          <div className="col-6 input-group ">
            <button
              className="btn btn-outline-danger input-group-append"
              onClick={() => {
                changeCartProduct(product, -1);
              }}
              disabled={product.Quantity === 1}
            >
              <i className="bi bi-dash-lg"></i>
            </button>
            <div
              type="text"
              className="form-control quantity-input d-flex justify-content-center align-self-center "
            >
              {product.Quantity}
            </div>
            <button
              className="btn btn-outline-success input-group-append rounded-end "
              onClick={() => {
                changeCartProduct(product, +1);
              }}
              disabled={product.Quantity === product.Stock}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col row col-sm-4 col-12 pe-2 d-flex flex-column justify-content-around ">
        <div className="d-flex justify-content-end ">
          <i
            className="btn btn-danger  bi bi-trash3-fill m-2"
            onClick={() => {
              changeCartProduct(product, false, true);
            }}
          ></i>
        </div>
        <div className="fs-5 fw-bold text-success d-flex justify-content-end">
          {numberWithCommas(
            (product.Price * product.Quantity * (100 - product.Discount)) / 100
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
