import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import getServerURL from "../../Utils/getServerURL";
import "./HomePage.css";

import ProductCard from "../../Components/ProductCard/ProductCard";
import Carousel from "../../Components/Carousel/Carousel";
import Separator from "Components/Seperator/Separator";

const HomePage = () => {
  const [data, setData] = useState([]);

  //#region fetch data for products
  useLayoutEffect(() => {
    axios.get(getServerURL("/home")).then((res) => {
      setData(res.data);
    });
  }, []);
  //#endregion
  const headings = ["On Demand", "Smart Phones", "Smart Tablets"];
  return (
    <>
      <main className="container-fluid m-0 p-0">
        <Carousel />
        {data.length !== 0 ? data.map((value, key)=>{
          return (
            <div
              className="row d-flex justify-content-around m-0 p-2"
              key={key}
            >
              <Separator className="fs-3 fw-bold font-Helvetica">
                {headings[key]}
              </Separator>
              {value.length !== 0 ? (
                value.map((v, k) => {
                  return <ProductCard data={v} key={k} />;
                })
              ) : (
                <div>Loading.....</div>
              )}
            </div>
          );}
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </>
  );
};

export default HomePage;
