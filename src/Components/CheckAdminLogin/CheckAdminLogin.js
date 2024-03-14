import React from "react";
import { Outlet } from "react-router-dom";

const CheckAdminLogin = () => {
  return (
    // TODO : implement checking for admin login and if not reroute to login
    <>
      <div>CheckAdminLogin</div>
      <Outlet />
    </>
  );
};

export default CheckAdminLogin;
