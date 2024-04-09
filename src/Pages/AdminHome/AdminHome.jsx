import React from "react";

import { useNavigate } from "react-router-dom";
import AdminSearch from "../../Components/AdminSearch/AdminSearch";

const AdminHome = () => {
    const navigate = useNavigate()
  return (
    <main>
      <div className="row d-flex justify-content-around ">
        <button
          type="button"
          className="col col-11 col-md-3 m-3 btn btn-outline-danger fs-5"
          onClick={()=>{
            navigate("/admin/approve")
          }}
        >
          <i class="bi bi-journal-check m-2"></i>
          Approve Reservations
          <span class=" badge rounded-pill bg-danger fs-7 mx-2 ">
            9+
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>
        <button
          type="button"
          className="col col-11 col-md-3 m-3 btn btn-outline-warning fs-5"
          onClick={()=>{
            navigate("/admin/update")
          }}
        >
          <i class="bi bi-arrow-repeat m-2"></i>
          Update Product
        </button>
        <button
          type="button"
          className="col col-11 col-md-3 m-3 btn btn-outline-success fs-5"
          onClick={()=>{
            navigate("/admin/add")
          }}
        >
          <i class="bi bi-upload m-2"></i>
          Add New Product
        </button>
      </div>
      <hr />
      <div className="ms-2">
        Stock Search
      </div>
      <AdminSearch/>
      
    </main>
  );
};

export default AdminHome;
