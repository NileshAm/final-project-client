import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import "../SearchPanel/SearchPanel.css";
import getServerURL from "../../Utils/getServerURL";
import numberWithCommas from "../../Utils/numberWithCommas";
import { CheckBox } from "../CheckBox/CheckBox";
import ProductCard from "../ProductCard/ProductCard";
import { RadioBtn } from "../RadioBtn/RadioBtn";
const AdminSearch = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);

  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(500000);

  useLayoutEffect(() => {
    axios.get(getServerURL("/brands")).then((res) => {
      setBrand(res.data);
    });
    axios.get(getServerURL("/category")).then((res) => {
      setCategory(res.data);
    });
    getData();
    //eslint-disable-next-line
  }, []);

  const getData = () => {
    const form = new FormData();

    form.append("term", document.getElementById("term").value);
    form.append("brands", getCheckList("brands"));
    form.append("categories", getCheckList("category"));
    form.append("price", document.getElementById("price").value);
    form.append("rating", document.getElementById("rating").value);
    form.append("isAdmin", true);

    document.getElementsByName("Statue").forEach((element) => {
      if (element.checked) {
        form.append("status", element.value);
      }
    });

    axios.post(getServerURL("/search"), form, {}).then((res) => {
      setData(res.data);
    });
  };

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

  const submit = (event) => {
    event.preventDefault();

    getData();
  };

  return (
    <>
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
          </div>
        </div>
        <div className="collapse row me-0 show">
          <hr className="m-1 mt-3" />
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 ps-3 border-s">
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
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 ps-3 border-s">
            <hr className="m-2 d-lg-none d-md-none d-sm-none" />
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
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 ps-3 border-s">
            <hr className="m-2 d-lg-none d-md-none" />
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
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 ps-3 border-s">
            <hr className="m-2 d-lg-none" />
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
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 ps-3 border-s">
            <hr className="m-2 d-lg-none" />
            <div>Statues</div>
            <div className="col-10 offset-1">
              <RadioBtn
                id={"Statue"}
                label={"All"}
                defaultValue
                value={undefined}
                className={"col-12"}
              />
              <RadioBtn
                id={"Statue"}
                label={"Active"}
                value={"1"}
                className={"col-12"}
              />
              <RadioBtn
                id={"Statue"}
                label={"Inactive"}
                value={"0"}
                className={"col-12"}
              />
            </div>
          </div>

          <div className="col-12 d-flex justify-content-center ms-1">
            <button
              className="btn btn-success col-6 col-sm-4 col-md-3 col-lg-2 m-2"
              type="submit"
            >
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
      
      <div className="row d-flex justify-content-around">
        {data.length === 0 ? (
          <p className="p-3">No Items under given filters</p>
        ) : (
          data.map((v, k) => {
            return <ProductCard data={v} key={k} admin />;
          })
        )}
      </div>
    </>
  );
};

export default AdminSearch;
