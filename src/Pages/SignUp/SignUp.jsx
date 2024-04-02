import React, { useState } from "react";

import "./SignUp.css";
import { FormGroup } from "../../Components/FormGroup/FormGroup";
import axios from "axios";
import getServerURL from "../../Utils/getServerURL";

const SignUp = () => {
  const [fieldError, setFieldError] = useState("");
  const submit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    form.set("email", form.get("email").toLowerCase());
    for (let key of form.keys()) {
      if (form.get(key).trim() === "") {
        if (key === "conPassword") {
          key = "Confirm Password";
        }
        setFieldError(key.charAt(0).toUpperCase() + key.slice(1) + " is empty");
        return;
      }
    }

    if (form.get("password") !== form.get("conPassword")) {
      setFieldError("Password and Confirmed password do not match");
      return;
    }

    axios.post(getServerURL("/signup"), form, {}).then((res) => {
      if (res.data.signedUp) {
        alert("Succefully signed up");
        let url = new URLSearchParams(window.location.search).get(
          "returnurl"
        );
        if(!url){
          url = "/"
        }
        window.location.href = url
      } else {
        setFieldError(res.data.message);
      }
    });
  };
  const textChange = () => {
    setFieldError("");
  };
  return (
    <div className="container-fluid p-sm-0 p-3 back-drop bg-dark-subtle d-flex justify-content-center align-items-center ">
      <div className="col-md-4 col-sm-6 col-12 bg-light rounded-3 shadow-sm p-3">
        <h1 className="text-success d-flex justify-content-center ">Sign Up</h1>
        <form onSubmit={submit}>
          <FormGroup
            label={"Name"}
            name={"name"}
            className={"mt-3"}
            onChange={textChange}
          />
          <FormGroup
            label={"Email"}
            name={"email"}
            className={"mt-3"}
            type={"email"}
            onChange={textChange}
          />
          <FormGroup
            label={"Password"}
            name={"password"}
            className={"mt-3"}
            type={"password"}
            onChange={textChange}
          />
          <FormGroup
            label={"Confirm Password"}
            name={"conPassword"}
            className={"mt-3"}
            type={"password"}
            onChange={textChange}
          />
          {fieldError !== "" && (
            <div className="bg-danger-subtle d-flex justify-content-center mt-3 rounded-3  p-1 text-danger">
              {fieldError}
            </div>
          )}
          <button type="submit" className="btn btn-success w-100 mt-3">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
