import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import getServerURL from "../../Utils/getServerURL";

const CheckAdminLogin = () => {
  axios.defaults.withCredentials = true;

  const [name, setName] = useState("");

  const navigate = useNavigate();

  useLayoutEffect(() => {
    axios.get(getServerURL("/login")).then((res) => {
      if (!res.data.loggedIn) {
        navigate("/admin/login");
      } else {
        setName(res.data.user.Name);
      }
    });
  });
  return (
    <>
      <div>{name}</div>
      <Outlet />
    </>
  );
};

export default CheckAdminLogin;
