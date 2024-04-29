import React from "react";
import axios from 'axios'

import { FormGroup } from "../../Components/FormGroup/FormGroup";
import getServerURL from "../../Utils/getServerURL";

const AdminBrandCategory = () => {
  const submit = (type) => {
    const form = new FormData(document.getElementById(type + "-form"));

    axios.post(getServerURL("/add/"+type), form).then(res=>{
        if(res.data.code===200){
            alert("Item added Successfully")
            window.location.href="/admin/"
        }else{
            alert("Error occured")
        }
    })
  };
  return (
    <main className="p-4 py-2 row">
      <div className="col-md-6 col-12">
        <div className="fs-2">Add Brand</div>
        <form className="row p-2" id="brand-form">
          <FormGroup label={"Brand"} name={"brand"} type={"text"} />
          <button
            className="col-12 btn btn-success mt-4"
            type="button"
            onClick={() => {
              submit("brand");
            }}
          >
            Add brand
          </button>
        </form>
      </div>
      <div className="col-md-6 col-12">
        <div className="fs-2">Add Category</div>
        <form className="row p-2" id="category-form">
          <FormGroup label={"Category"} name={"category"} type={"text"} />
          <button
            className="col-12 btn btn-success mt-4"
            type="button"
            onClick={() => {
              submit("category");
            }}
          >
            Add category
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminBrandCategory;
