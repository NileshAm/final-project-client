import React from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import Ratio from "react-bootstrap/Ratio";
import getServerURL from "../../Utils/getServerURL";
import axios from "axios";
import { useLayoutEffect, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductView.css";
import numberWithCommas from "Utils/numberWithCommas";
import StarRating from "Components/StarRating/StarRating";
import ProductCard from "Components/ProductCard/ProductCard";

function ProductView() {
  const [data, setData] = useState({});
  const params = new URLSearchParams(window.location.search);

  const navigate = useNavigate();
  const [simillarProducts, setsimillarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const decrememntCount = () => setQuantity(quantity - 1);
  const increaceCount = () => setQuantity(quantity + 1);

  const submit = (type) => {
    let formData = new FormData(); //formdata object
    //append the values with key, value pair
    formData.append("productID", params.get("id"));
    formData.append("quantity", quantity);

    axios
      .post(getServerURL("/cart/add"), formData)
      .then((response) => {
        console.log(response);
        if (response.data.code == 403) {
          alert("Please Login");
        } else if (response.data.code == 200) {
          if ((type = "buy")) {
            navigate("/cart");
          } else {
            alert("Product added to the cart");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (params.get(`id`) == null) {
    navigate("/");
  }

  useLayoutEffect(() => {
    axios.get(getServerURL(`/product?id=${params.get("id")}`)).then((res) => {
      setData(res.data[0]);
      console.log(res.data[0].Rating);
    });

    axios
      .get(getServerURL(`/product/similar?id=${params.get("id")}`))
      .then((res) => {
        setsimillarProducts(res.data[0]);
      });
  }, []);

  return (
    <>
      <Container className="mt-3 bg-light">
        <Row className="">
          <Col md={6}>
            <div style={{ borderRadius: "10px", margin: 20 }} className="phone">
              <Ratio aspectRatio="1x1">
                <img
                  src={data.Image}
                  alt={data.Name}
                  style={{ objectFit: "cover" }}
                  className="rounded-3"
                />
              </Ratio>
            </div>
          </Col>

          <Col md={6} className="mt-2">
            <h1>{data.Name}</h1>
            <Row>
              <h5>
                {data.Rating} {/* To-do */}
                {/* <StarRating Rating={data.Rating} starSize={20} className="rating-width"/> */}
              </h5>
              <Col>
                <div
                  style={{ backgroundColor: "#e6e1e3" }}
                  className="px-3 py-2 rounded-3"
                >
                  <p className="description">{data.Description}</p>
                </div>
              </Col>
            </Row>

            {/* Prices */}
            <Row>
              <Col xs={6} md={8}>
                <h2 className="text-success mt-3">
                  {numberWithCommas(
                    data.Price - (data.Price * data.Discount) / 100
                  )}
                </h2>
              </Col>

              <Col xs={6} md={4}>
                <div className="col-6 input-group m-3">
                  <button
                    className="btn btn-outline-danger input-group-append"
                    // onClick={() => {
                    //   changeCartProduct(product, -1);
                    // }}
                    disabled={quantity === 1}
                    onClick={decrememntCount}
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div
                    type="text"
                    className="form-control quantity-input d-flex justify-content-center align-self-center "
                  >
                    {quantity}
                  </div>
                  <button
                    className="btn btn-outline-success input-group-append rounded-end "
                    // onClick={() => {
                    //   changeCartProduct(product, +1);
                    // }}
                    disabled={quantity === data.Stock}
                    onClick={increaceCount}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
              </Col>
            </Row>

            {/* To-do */}
            <h3 className="text-danger ">
              {numberWithCommas((data.Price * data.Discount) / 100)}
            </h3>

            <Row className="mt-3 d-grid gap-2 mx-auto mb-2 ">
              {/* Make into loding state button */}
              <button
                className="btn btn-outline-success"
                onClick={() => submit("buy")}
              >
                Buy
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => submit("cart")}
              >
                Add to cart
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
      <div>
        <hr />
        <div className="d-flex row justify-content-around">
          {simillarProducts.length !== 0 ? (
            simillarProducts.map((v, k) => {
              return <ProductCard data={v} key={k} />;
            })
          ) : (
            <div>No simillar Products...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductView;
