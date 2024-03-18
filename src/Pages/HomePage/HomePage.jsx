import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import getServerURL from "../../Utils/getServerURL";

import ProductCard from "../../Components/ProductCard/ProductCard";

const HomePage = () => {
  const [data, setData] = useState([]);
  //#region fetch data for products
  useLayoutEffect(() => {
    axios.get(getServerURL("/home")).then((res) => {
      setData(res.data);
    });
  }, []);
  //#endregion

  return (
    <>
      <main className="container-fluid m-0 p-0">
      {/* <Login /> */}
        <div className="row d-flex justify-content-around m-0 p-2">
          {data.map((v, k) => {
            return <ProductCard data={v} key={k} />;
          })}
        </div>
      </main>
    </>
  );
};

export default HomePage;
