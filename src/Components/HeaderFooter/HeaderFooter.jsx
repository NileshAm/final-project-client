import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SearchPanel from "../SearchPanel/SearchPanel";
import Footer from "../Footer/Footer";
import Login from "../../Components/Login/Login";
import axios from "axios";
import getServerURL from "../../Utils/getServerURL";

const HeaderFooter = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [name, setName] = useState("");
  const [IsLogged, setIsLogged] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(getServerURL("/login")).then((res) => {
      setIsLogged(res.data.loggedIn);
      if (res.data.loggedIn) {
        setName(res.data.user.Name);
      }
    });
  }, [login]);

  return (
    <>
      <Login
        stateSetter={setLogin}
        state={login}
        redirect={redirect}
        setRedirect={setRedirect}
      >
        <nav className="d-flex justify-content-around ">
          <a href="/">home</a>
          <div>{name===""?"login":name}</div>
          <button
            onClick={() => {
              setLogin(true);
            }}
          >
            account
          </button>
          <button
            onClick={() => {
              if (IsLogged) {
                navigate("/cart");
              } else {
                setRedirect("/cart");
                setLogin(true);
              }
            }}
          >
            cart
          </button>
        </nav>
        {window.location.pathname !== "/cart" && <SearchPanel />}
        <Outlet />
        <Footer />
      </Login>
    </>
  );
};

export default HeaderFooter;