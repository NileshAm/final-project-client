import axios from "axios";
import React, { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import getServerURL from "../../Utils/getServerURL";

const CheckAdminLogin = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  useLayoutEffect(() => {
    axios.get(getServerURL("/login")).then((res) => {
      if (!res.data.loggedIn || !res.data.user.isAdmin) {
        navigate("/admin/login");
      }
    });
  });
  return (
    <>
      <nav className="d-flex justify-content-around ">
        <a href="/admin">home</a>
        <button onClick={()=>{
          axios.defaults.withCredentials = true;
          axios.get(getServerURL("/logout")).then(()=>{
            window.location.href = "/admin/login"
          })
        }}>logout</button>
      </nav>
      <Outlet />
    </>
  );
};

export default CheckAdminLogin;