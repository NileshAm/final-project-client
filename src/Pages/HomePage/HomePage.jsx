import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import getServerURL from "../../Utils/getServerURL";

import ProductCard from "../../Components/ProductCard/ProductCard";
import Login from "../../Components/Login/Login";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [IsLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();
  //#region fetch data for products
  useLayoutEffect(() => {
    axios.get(getServerURL("/home")).then((res) => {
      setData(res.data);
    });
  }, []);
  //#endregion


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(getServerURL("/login")).then((res) => {
      setIsLogged(res.data.loggedIn)
      if (res.data.loggedIn) {
        setName(res.data.user.Name);
      }
    });
  }, [login]);
  return (
    <>
      <main className="container-fluid m-0 p-0">
        <Login stateSetter={setLogin} state={login}>
          <button
            onClick={() => {
              setLogin(true);
            }}
          >
            account
          </button>
          <button
            onClick={()=>{
              if(IsLogged){
                navigate("/cart")
              }else{
                alert("login")
              }
            }}
          >
            cart
          </button>
          <div>{name}</div>
          <div className="row d-flex justify-content-around m-0 p-2">
            {data.map((v, k) => {
              return <ProductCard data={v} key={k} />;
            })}
          </div>
        </Login>
      </main>
    </>
  );
};

export default HomePage;
