import React, { useState } from "react";

import "./Login.css";
import Logo from "../../logo.svg";
import axios from "axios";
import getServerURL from "../../Utils/getServerURL";
import { useNavigate } from "react-router";
import { FormGroup } from "../FormGroup/FormGroup";

const Login = ({ admin, stateSetter, state, children }) => {
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
    <>
      {state && (
        <form
          className="container-fluid p-0 login d-flex justify-content-center align-items-center px-3 px-sm-0"
          onSubmit={submit}
          onClick={() => {
            stateSetter(false);
          }}
        >
          <div className="d-flex flex-column bg-light col-lg-3 col-md-6 col-sm-8 col-12 rounded-4 p-3 " onClick={(event)=>{event.stopPropagation()}}>
            <div className="d-flex">
              <img src={Logo} alt="logo" className="logo" />
              <div className=" fs-1 fw-bolder text-success  col-6 offset-1 justify-content-center d-flex">
                Login
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                // height={10}
                viewBox="0 -0.5 25 25"
                fill="none"
                className="d-flex align-self-start cursor-pointer"
                onClick={()=>{stateSetter(false)}}
              >
                <path
                  d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                  fill="#000000"
                />
              </svg>
              
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
              href={
                "/signup?returnurl=" + encodeURIComponent(window.location.href)
              }
              className="pt-3 fs-7 d-flex justify-content-center"
            >
              Create an account
            </a>
          </div>
        </form>
      )}
      {children}
    </>
  );
};

export default Login;
