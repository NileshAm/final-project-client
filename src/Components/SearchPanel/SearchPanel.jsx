import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import "./SearchPanel.css";
import getServerURL from "../../Utils/getServerURL";
import numberWithCommas from "../../Utils/numberWithCommas";
const SearchPanel = () => {
  const navigate = useNavigate();

  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);

  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(500000);
  //eslint-disable-next-line
  const params = new URLSearchParams(window.location.search);

  useLayoutEffect(() => {
    axios.get(getServerURL("/brands")).then((res) => {
      setBrand(res.data);
    });
    axios.get(getServerURL("/category")).then((res) => {
      setCategory(res.data);
    });
  }, []);
  useEffect(() => {
    if (window.location.pathname === "/search") {
      document.getElementById("term").value = params.get("term");
      setPrice(params.get("price"));
      document.getElementById("price").value = params.get("price");
      setRating(params.get("rating"));
      document.getElementById("rating").value = params.get("rating");
      setCheckList("brands", params.get("brands").split(","));
      setCheckList("category", params.get("categories").split(","));
    }
    //eslint-disable-next-line
  }, [brand, category]);


  const getCheckList = (id) => {
    const selectList = [];
    const list = document.getElementById(id).getElementsByTagName("input");

    for (const item of list) {
      if (item.checked) {
        selectList.push(item.value);
      }
    }
    return selectList.toString();
  };

  const setCheckList = (id, listToSelect) => {
    const list = document.getElementById(id).getElementsByTagName("input");

    for (const item of list) {
      if (listToSelect.includes(item.value)) {
        item.defaultChecked = true;
      }
    }
  };

  const submit = (event) => {
    event.preventDefault();

    navigate(
      `/search?term=${
        document.getElementById("term").value
      }&brands=${getCheckList("brands")}&categories=${getCheckList(
        "category"
      )}&rating=${rating}&price=${price}`
    );
    if (window.location.pathname === "/search") {
      window.location.reload();
    }
  };

  return (
    <form
      className="bg-light p-2"
      onSubmit={(event) => {
        submit(event);
      }}
    >
      <div className="col-lg-4 col-md-6 col-sm-8 col-12 offset-lg-4 offset-md-3 offset-sm-2 offset-0">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search....."
            name="term"
            id="term"
          />
          <button className="btn btn-outline-secondary " type="submit">
            <i className="bi bi-search"></i>
          </button>
          <button
            className="btn btn-outline-secondary "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#FilterPanel"
            aria-expanded="false"
            aria-controls="FilterPanel"
          >
            Filters<i className="bi bi-caret-down-fill"></i>
          </button>
        </div>
      </div>
      <div
        className={
          "collapse row me-0 " +
          (window.location.pathname === "/search" && "show")
        }
        id="FilterPanel"
      >
        <hr className="m-1 mt-3" />
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 ps-3 border-s">
          <div>Brand</div>
          <div className="row" id="brands">
            {brand.map((brand, k) => {
              return (
                <CheckBox
                  key={k}
                  label={brand.Name}
                  id={brand.Name}
                  className="col-6"
                  value={brand.ID}
                />
              );
            })}
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 ps-3 border-s">
          <hr className="m-2 d-lg-none d-md-none d-sm-none"/>
          <div>Category</div>
          <div className="row" id="category">
            {category.map((category, k) => {
              return (
                <CheckBox
                  key={k}
                  label={category.Category}
                  id={category.Category}
                  className="col-6"
                  value={category.ID}
                />
              );
            })}
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 ps-3 border-s">
          <hr className="m-2 d-lg-none d-md-none"/>
          <div>Rating</div>
          <div className="col-10 offset-1">
            <input
              type="range"
              name="rating"
              id="rating"
              step={0.1}
              min={0}
              max={5}
              defaultValue={rating}
              className="form-range col-8"
              onChange={(event) => {
                setRating(event.target.value);
              }}
            />
            <div className="d-flex justify-content-between">
              <p>0</p>
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 ps-3 border-s">
          <hr className="m-2 d-lg-none"/>
          <div>Price</div>
          <div className="col-10 offset-1">
            <input
              type="range"
              name="price"
              id="price"
              step={1000}
              min={0}
              max={500000}
              defaultValue={price}
              className="form-range col-8"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <div className="d-flex justify-content-between">
              <p>{numberWithCommas(0)}</p>
              <p>{numberWithCommas(price)}</p>
            </div>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center ms-1">
          <button className="btn btn-success col-6 col-sm-4 col-md-3 col-lg-2 m-2" type="submit">
            Apply
          </button>
          <button
            className="btn btn-danger col-6 col-sm-4 col-md-3 col-lg-2 m-2"
            onClick={() => {
              navigate(
                `/search?term=&brands=&categories=&rating=0&price=500000`
              );
              if (window.location.pathname === "/search") {
                window.location.reload();
              }
            }}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

const CheckBox = ({
  label,
  className,
  hidden,
  defaultChecked,
  value,
  id,
  onChange,
}) => {
  return (
    <div className={className} hidden={hidden}>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        value={value}
        name={id}
        id={id}
        onChange={onChange}
      />
      <label className="ms-1">{label}</label>
    </div>
  );
};

export default SearchPanel;
