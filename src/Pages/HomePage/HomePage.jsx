import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import getServerURL from '../../Utils/getServerURL'

import ProductCard from "../../Components/ProductCard/ProductCard";

const HomePage = () => {
  const [data, setData] = useState([]);

  useLayoutEffect(()=>{
    axios
      .get(getServerURL("/home"))
      .then((res) => {
        setData(res.data)
      })

    }, [])

    useEffect(()=>console.log(data), [data])
  return (
    <>
      <main className="container-fluid">
        <div className="row d-flex justify-content-around m-2">
          {data.map((v, k) => {
            return <ProductCard data={v} key={k}/>;
          })}
        </div>
      </main>
    </>
  );
};

export default HomePage;
