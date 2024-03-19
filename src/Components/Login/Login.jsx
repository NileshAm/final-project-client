import React, { useState } from "react";

import "./Login.css";
import Logo from "../../logo.svg";
import axios from "axios";
import getServerURL from "../../Utils/getServerURL";
import { useNavigate } from "react-router";
import { FormGroup } from "../FormGroup/FormGroup";

const Login = ({ admin }) => {
  const navigate = useNavigate();

  const [fieldError, setFieldError] = useState("");

  const submit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    form.set("email", form.get("email").toLowerCase());
    for (const key of form.keys()) {
      if (form.get(key).trim() === "") {
        setFieldError(key.charAt(0).toUpperCase() + key.slice(1) + " is empty");
        return;
      }
    }

    let url = "/login/user";
    if (admin) {
      url = "/login/admin";
    }

    axios.post(getServerURL(url), form, {}).then((res) => {
      if (res.data.redirect) {
        navigate(res.data.redirect);
      }
      console.log(res.data.Access);
      if (res.data.Access === "Granted") {
        alert("login");
      } else {
        alert("denied");
      }
    });
  };
  const textChange = () => {
    setFieldError("");
  };
  return (
    <form
      className="container-fluid p-0 login d-flex justify-content-center align-items-center px-3 px-sm-0"
      onSubmit={submit}
    >
      <div className="d-flex flex-column bg-light col-lg-3 col-md-6 col-sm-8 col-12 rounded-4 p-3">
        <div className="d-flex">
          <img src={Logo} alt="logo" className="logo" />
          <div className=" fs-1 fw-bolder text-success  col-6 offset-1 justify-content-center d-flex">
            Login
          </div>
        </div>

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
        {fieldError !== "" && (
          <div className="bg-danger-subtle d-flex justify-content-center mt-3 rounded-3  p-1 text-danger">
            {fieldError}
          </div>
        )}
        <button className="btn btn-outline-success mt-3" type="submit">
          Login
        </button>
        <a
          href={"/signup?returnurl=" + encodeURIComponent(window.location.href)}
          className="pt-3 fs-7 d-flex justify-content-center"
        >
          Create an account
        </a>
      </div>
    </form>
  );
};

export default Login;
