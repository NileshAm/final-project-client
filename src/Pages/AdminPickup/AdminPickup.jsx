import getServerURL from "Utils/getServerURL";
import numberWithCommas from "Utils/numberWithCommas";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";

const AdminPickup = () => {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    axios.get(getServerURL("/admin/pickup/items")).then((res) => {
      console.log(res.data);
      if (res.data) {
        setData(res.data);
      }
    });
  }, []);
  return (
    <main className="p-md-2 p-1">
      <div className="accordion" id="accordionExample">
        {data.length === 0 ? (
          <div className="fs-3 text-body-tertiary">No Pending Pickups...</div>
        ) : (
          data.map((v, k) => {
            return <AccordionItem data={v} key={k} />;
          })
        )}
      </div>
    </main>
  );
};

const AccordionItem = ({ data }) => {
  const form = new FormData();
  form.append("CartID", data.CartID);

  const submit = (state) => {
    //eslint-disable-next-line
    if (!confirm(`Are you sure you want to mark this transaction as pickuped up?`)) {
      return;
    }
    axios.post(getServerURL(`/admin/pickup`), form).then((res) => {
      if (res.data.code === 200) {
        alert(`Order picked up successfully`);
        window.location.reload();
      }
    });
  };
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + data.CartID}
          aria-expanded="false"
          aria-controls={data.CartID}
        >
          <div className="col-1">Order #{data.CartID}</div>
          <div className="offset-md-8 offset-sm-6 offset-4 col-2  ">
            <span className="me-2">{data.PayDate.split("T")[0]}</span>
            <span className="">{data.PayDate.split("T")[1]}</span>
          </div>
        </button>
      </h2>
      <div
        id={data.CartID}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body row p-md-3 p-1">
          <div className="col-12 py-2 row">
            <div className="row col-12 col-md-6 pb-2 pt-md-0 pt-2">
              <span className="col-12">Customer Name : {data.Name}</span>
              <span className="col-12">Customer Contact : {data.Contact}</span>
            </div>
            <div className="border p-2 rounded col-12 col-md-6">
              {data.Items.map((v, k) => {
                console.log(k);
                return (
                  <>
                    <ProductItem key={k} data={v} />
                    <hr className="my-2" hidden={data.Items.length === k + 1} />
                  </>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="row col-md-6 col-12 pt-2">
              <div className="col-12 text-danger fs-4">
                Discount : {numberWithCommas(data.Discount)}
              </div>
              <div className="col-12 text-success fs-4 fw-bold">
                Total : {numberWithCommas(data.TotalPrice)}
              </div>
            </div>
            <div className="col-md-6 col-12 pt-2">
              <button
                className="btn col-12 btn-outline-success m-1"
                onClick={() => {
                  submit();
                }}
              >
                Pick Up
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductItem = ({ data }) => {
  return (
    <div className="row">
      <img src={data.Image} alt="" className="col-2 border rounded shadow-sm" />
      <div className="col-10 row">
        <div className="col-6 ps-3">{data.Name}</div>
        {data.Discount !== 0 && (
          <div className="col-3">
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
              style={{ position: "relative", bottom: "22px" }}
              className="fs-7 fw-bolder text-light ps-2 m-0"
            >
              -{data.Discount}%
            </p>
          </div>
        )}
        <div className={"col-3 " + (data.Discount === 0 && "offset-3")}>
          Quantity : {data.Quantity}
        </div>
        {data.Discount !== 0 && (
          <div className="col-6 ps-3 text-danger fs-6">
            {numberWithCommas(
              ((data.Price * data.Discount) / 100) * data.Quantity
            )}
          </div>
        )}
        <div
          className={
            "col-6 text-success fs-5 fw-bold  " +
            (data.Discount === 0 && "offset-6")
          }
        >
          {numberWithCommas(
            ((data.Price * (100 - data.Discount)) / 100) * data.Quantity
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPickup;
