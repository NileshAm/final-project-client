import React from "react";

import "./Login.css";
import Logo from "../../logo.svg";
import axios from "axios";
import getServerURL from "../../Utils/getServerURL";
import { useNavigate } from "react-router";

const Login = ({admin}) => {
    const navigate = useNavigate()
  const submit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    let url = "/login/user"
    if(admin){
        url = "/login/admin"
    }

    axios
      .post(getServerURL(url), form, {})
      .then((res) => {
        if(res.data.redirect){
            navigate(res.data.redirect)
        }
      })
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

        <FormGroup label={"Username"} name={"username"} />
        <FormGroup label={"Password"} name={"password"} />

        <button className="btn btn-outline-success mt-3" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

const FormGroup = ({ label, name }) => {
  return (
    <div className="form-group mt-3">
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={"Enter your " + label}
        id={name}
        name={name}
      />
    </div>
  );
};

export default Login;
