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
      <Outlet />
    </>
  );
};

export default CheckAdminLogin;
