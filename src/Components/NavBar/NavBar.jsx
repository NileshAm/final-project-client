import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import logo from "logo.svg";
import getServerURL from "Utils/getServerURL";
import "./NavBar.css";

const Navbar = ({ IsLogged, setLogin, setRedirect, user }) => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  useLayoutEffect(() => {
    axios.get(getServerURL("/brands")).then((res) => {
      setBrands(res.data);
    });
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark-subtle p-0">
        <div className="container-fluid">
          <a className="navbar-brand p-0" href="/">
            <img src={logo} alt="logo" height={30} className="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-around">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggl col-12"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mobile Devices <i className="bi bi-caret-down-fill fs-6"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/search?term=&brands=&categories=1&rating=0&price=500000"
                    >
                      Mobile Phones
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/search?term=&brands=&categories=2&rating=0&price=500000"
                    >
                      Tablets
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/search?term=&brands=&categories=3&rating=0&price=500000"
                >
                  Accessories
                </a>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link col-12"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Brands <i className="bi bi-caret-down-fill fs-6"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {brands.length === 0 ? (
                    <li>
                      <button className="dropdown-item" href="#">
                        Loading
                      </button>
                    </li>
                  ) : (
                    brands.map((v, k) => {
                      return (
                        <li key={k}>
                          <a
                            className="dropdown-item"
                            href={`/search?term=&brands=${v.ID}&categories=&rating=0&price=500000`}
                          >
                            {v.Name}
                          </a>
                        </li>
                      );
                    })
                  )}
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About Us
                </a>
              </li>
              <div className="d-flex py-1 col-md-2 col-12 d-flex justify-content-around">
                <button
                  className={
                    "bi bi-cart3 btn btn-dark p-1 rounded-circle border-1 fw-bold px-2_5"
                  }
                  onClick={() => {
                    if (IsLogged) {
                      navigate("/cart");
                    } else {
                      setRedirect("/cart");
                      setLogin(true);
                    }
                  }}
                ></button>
                {IsLogged ? (
                  <button
                    type="button"
                    className="bi bi-person btn btn-dark p-1 px-2 rounded-circle border-1 fw-bold px-2_5"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  ></button>
                ) : (
                  <>
                    <button
                      className="btn btn-primary p-1"
                      onClick={() => {
                        setLogin(true);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="btn btn-primary p-1"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <Modal user={user} />
    </>
  );
};

const Modal = ({ user }) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Account Info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body row">
              <div className="col-2">
                <i className="bi bi-person fs-1 border border-2 px-2 rounded-circle border-dark"></i>
              </div>
              <div className="col-10">
                <div>Email : {user.Email}</div>
                <div>Name : {user.Name}</div>
                <div>Contact : {user.Contact}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  axios.defaults.withCredentials = true;
                  axios.get(getServerURL("/logout")).then(() => {
                    if (window.location.pathname === "/cart") {
                      window.location.href = "/";
                    } else {
                      window.location.reload();
                    }
                  });
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
