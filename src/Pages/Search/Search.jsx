import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import getServerURL from "../../Utils/getServerURL";
import ProductCard from "../../Components/ProductCard/ProductCard";
import numberWithCommas from "../../Utils/numberWithCommas";

const Search = () => {
  const [data, setData] = useState([]);
  //eslint-disable-next-line
  const params = new URLSearchParams(window.location.search);

  const [brand, setBrand] = useState({});
  const [category, setCategory] = useState({});
  useLayoutEffect(() => {
    let br = {};
    axios.get(getServerURL("/brands")).then((res) => {
      for (const b of res.data) {
        br[b.ID] = b.Name;
      }
      setBrand(br);
    });
    let ct = {};
    axios.get(getServerURL("/category")).then((res) => {
      for (const c of res.data) {
        ct[c.ID] = c.Category;
      }
      setCategory(ct);
    });
  }, []);

  let searchParam = {};
  for (const key of params.keys()) {
    searchParam[key] = params.get(key);
  }
  useEffect(() => {
    const form = new FormData();

    for (const key of params.keys()) {
      form.append(key, params.get(key));
    }

    axios.post(getServerURL("/search"), form, {}).then((res) => {
      setData(res.data);
    });
  }, [params]);

  return (
    <main>
      <div className="p-2 fs-5 text-secondary">
        <span>Search results for </span>
        <span className="fw-bold  text-dark">{searchParam.term} </span>
        {searchParam.brands !== "" && (
          <>
            <span>under brands </span>
            <span className="fw-bold  text-dark">
              {searchParam.brands.split(",").map((v) => {
                return brand[v] + ", ";
              })}
            </span>
          </>
        )}
        {searchParam.categories !== "" && (
          <>
            <span>under categories </span>
            <span className="fw-bold  text-dark">
              {searchParam.categories.split(",").map((v) => {
                return category[v] + ", ";
              })}
            </span>
          </>
        )}
        <span> with rating higher than </span>
        <span className="fw-bold  text-dark">{searchParam.rating}</span>
        <span> and price lower than </span>
        <span className="fw-bold  text-dark">{numberWithCommas(searchParam.price)}</span>
      </div>
      <div className="row col-12 p-2 ps-3 d-flex justify-content-around">
        {data.length === 0 ? (
          <div>No search results</div>
        ) : (
          data.map((v, k) => {
            return <ProductCard key={k} data={v} />;
          })
        )}
      </div>
    </main>
  );
};

export default Search;
