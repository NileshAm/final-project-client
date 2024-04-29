import { FormGroup } from "../../Components/FormGroup/FormGroup";
import getServerURL from "../../Utils/getServerURL";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import "./AdminUpdate.css";
import { CheckBox } from "Components/CheckBox/CheckBox";
import ErrorField from "Components/ErrorField/ErrorField";

const AddProduct = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState({});

  const [image, setImage] = useState(false);
  const [description, setDescription] = useState(false);
  const [price, setPrice] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [stock, setStock] = useState(false);
  
  const params = new URLSearchParams(window.location.search);
  useLayoutEffect(() => {
    axios
    .get(getServerURL(`/admin/product/details?id=${params.get("id")}`))
      .then((res) => {
          setData(res.data);
        });
        //eslint-disable-next-line
  }, []);
  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    form.append("id", params.get("id"));
    const keys = ["Image", "Description", "Price", "Discount", "Stock"];
    keys.forEach((key) => {
      if (form.get(key.toLowerCase()) === null) {
        form.append(key.toLowerCase(), data[key]);
      }
    });
    
    for (const key of form.keys()) {
        try {
        if (form.get(key).name === "") {
          setError(key + " field empty");
          return;
        }
      } catch (error) {}
      try {
        if (form.get(key).trim() === "") {
          setError(key + " field empty");
          return;
        }
      } catch (error) {}
    }
    axios.defaults.withCredentials = true;
    axios.post(getServerURL("/admin/product/update"), form).then((res) => {
      if (res.data.code === 200) {
        alert(res.data.message);
        window.location.reload();
      } else {
          setError(res.data.error);
      }
    });
  };
  const errorSetter = () => {
    setError(null);
  };

  const validateInput = (event) => {
    if (event.target.value * 1 < 0) {
      event.target.value = "";
    }
  };
  return (
    <>
      <form
        className="d-flex justify-content-around row"
        encType="multipart/form-data"
        onSubmit={submit}
        >
        <div className="col-5">
          <FormGroup
            label={"Name"}
            name={"name"}
            className={"mt-2"}
            defaultValue={data.Name}
            disabled
            onChange={() => {
              errorSetter();
            }}
          />
          <div className="mt-2 row">
            <label className="col-12">Image</label>
            <EditBtn setState={setImage} />
            <img src={data.Image} alt="Product" className="col-3" />
            <input
              type="file"
              name="image"
              id="image"
              className="form-control img-input"
              accept=".jpg,.png"
              disabled={!image}
              onChange={() => {
                errorSetter();
            }}
            />
          </div>
          <div className="form-group mt-2">
            <label>Description</label>
            <EditBtn setState={setDescription} />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              className="form-control"
              defaultValue={data.Description}
              disabled={!description}
              onChange={() => {
                errorSetter();
            }}
            ></textarea>
          </div>

        </div>
        <div className="col-5 ">
          <FormGroup
            label={"Price"}
            name={"price"}
            type={"number"}
            className={"mt-2"}
            defaultValue={data.Price}
            disabled={!price}
            children={<EditBtn setState={setPrice} />}
            onChange={(event) => {
                errorSetter();
              validateInput(event);
            }}
          />
          <FormGroup
            label={"Discount"}
            name={"discount"}
            className={"mt-2"}
            type={"number"}
            defaultValue={data.Discount}
            disabled={!discount}
            children={<EditBtn setState={setDiscount} />}
            onChange={(event) => {
              errorSetter();
              validateInput(event);
            }}
          />
          <FormGroup
            label={"Stock"}
            name={"stock"}
            type={"number"}
            className={"mt-2"}
            defaultValue={data.Stock}
            disabled={!stock}
            children={<EditBtn setState={setStock} />}
            onChange={(event) => {
              errorSetter();
              validateInput(event);
            }}
          />
        </div>
        <ErrorField className={"col-11 "}>{error}</ErrorField>
        <button
          className="btn btn-success col-3 mt-2"
          disabled={
              !(image || description || price || stock || discount) ||
              error !== null
            }
            >
          submit
        </button>
      </form>
    </>
  );
};

const EditBtn = ({ setState }) => {
  const changeEvent = (e) => {
    setState(e.target.checked);
  };
  return (
    <CheckBox
      label={"edit"}
      onChange={(event) => {
        changeEvent(event);
      }}
    />
  );
};

export default AddProduct;