import React, { useLayoutEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import AdminSearch from "../../Components/AdminSearch/AdminSearch";
import axios from "axios";
import getServerURL from "Utils/getServerURL";

const AdminHome = () => {
  const navigate = useNavigate();

  const [approvalCount, setApprovalCount] = useState(0);
  const [pickupCount, setPickupCount] = useState(0);

  useLayoutEffect(() => {
    axios.get(getServerURL("/admin/approvals/count")).then((res) => {
      setApprovalCount(res.data.length);
    });
    axios.get(getServerURL("/admin/pickup/count")).then((res) => {
      setPickupCount(res.data.length);
    });
  }, []);
  return (
    <main>
      <div className="row d-flex justify-content-around ">
        <button
          type="button"
          className="col col-11 col-md-2 m-1 btn btn-outline-danger fs-6 mt-3"
          onClick={() => {
            navigate("/admin/approve");
          }}
        >
          <i className="bi bi-journal-check m-2"></i>
          Approve Reservations
          {approvalCount !== 0 && (
            <span className=" badge rounded-pill bg-danger fs-7 mx-2 ">
              {approvalCount}
              <span className="visually-hidden">unread messages</span>
            </span>
          )}
        </button>
        <button
          type="button"
          className="col col-11 col-md-2 m-1 btn btn-outline-warning fs-6 mt-3"
          onClick={() => {
            navigate("/admin/pickup");
          }}
        >
          <i className="bi bi-bag-check-fill m-2"></i>
          Pick ups
          {pickupCount !== 0 && (
            <span className=" badge rounded-pill bg-danger fs-7 mx-2 ">
              {pickupCount}
              <span className="visually-hidden">unread messages</span>
            </span>
          )}
        </button>
        <button
          type="button"
          className="col col-11 col-md-2 m-1 btn btn-outline-success fs-6 mt-3"
          onClick={() => {
            navigate("/admin/add");
          }}
        >
          <i className="bi bi-upload m-2"></i>
          Add New Product
        </button>
        <button
          type="button"
          className="col col-11 col-md-2 m-1 btn btn-outline-success fs-6 mt-3"
          onClick={() => {
            navigate("/admin/add/others");
          }}
        >
          <i className="bi bi-upload m-1"></i>Add brand/category
        </button>
      </div>
      <hr />
      <div className="ms-2">Stock Search</div>
      <AdminSearch />
    </main>
  );
};

export default AdminHome;
