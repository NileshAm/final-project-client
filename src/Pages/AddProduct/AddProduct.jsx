import { FormGroup } from "../../Components/FormGroup/FormGroup";
import getServerURL from "../../Utils/getServerURL";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [rating, setRating] = useState(2.5);
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisables] = useState(false);

  useEffect(() => {
    axios.get(getServerURL("/brands")).then((res) => {
      setBrands(res.data);
    });
    axios.get(getServerURL("/category")).then((res) => {
      setCategory(res.data);
    });
  }, []);

  const submit = (event) => {
    event.preventDefault();
    setIsDisables(true)
    const form = new FormData(event.target);
    for (const key of form.keys()) {
      try {
        if(form.get(key).name===""){
          setError(key + " field empty")
          return
        }
      } catch (error) {
        
      }
      try {
        if (form.get(key).trim() === "") {
          setError(key+ " field empty");
          return;
        }
      } catch (error) {
        
      }
      
    }
    axios.defaults.withCredentials = true
    axios.post(getServerURL("/admin/product/add"), form).then((res)=>{
        if(res.data.code === 400){
            setError(res.data.error)
        }
        else if(res.data.code ===201){
            alert(res.data.message)
            window.location.reload()

        }
    })
    setIsDisables(false)
  };
  const errorSetter = () => {
    setError(null);
    setIsDisables(false)
  };
  return (
    <>
      <h1>Add Product</h1>
      <form className="col-8 offset-2 row" encType="multipart/form-data" onSubmit={submit}>
        <div className="col-6">
          <FormGroup label={"Name"} name={"name"} className={""} onChange={()=>{errorSetter()}}/>
          <div className="mt-3">
            <label>Image</label>
            <input type="file" name="image" id="image" className="form-control" accept=".jpg,.png" onChange={()=>{errorSetter()}}/>
          </div>
          <div className="form-group mt-3">
            <label>Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              className="form-control"
            onChange={()=>{errorSetter()}}></textarea>
          </div>

          <FormGroup
            label={"Price"}
            name={"price"}
            type={"number"}
            className={"mt-3"}
          onChange={()=>{errorSetter()}}/>
        </div>
        <div className="col-6 row">
          <FormGroup label={"Discount"} name={"discount"} className={"mt-3"} type={"number"} onChange={()=>{errorSetter()}}/>
          <div className="form-group">
            <label>Rating</label>
            <input
              type="range"
              name="rating"
              id="rating"
              className="form-range"
              max={5}
              min={0}
              step={0.1}
              defaultValue={rating}
              onChange={(event) => {
                setRating(event.target.value);
              }}
            />
            <div className="d-flex justify-content-between mt-3">
              <p>0</p>
              <p>{rating}</p>
            </div>
          </div>
          <FormGroup
            label={"Stock"}
            name={"stock"}
            type={"number"}
            className={"mt-3"}
          onChange={()=>{errorSetter()}}/>

          <div className="form-group mt-lg-3 col-6">
            <label>Brands</label>
            <RadioBtn
              id={"brand"}
              label={"hidden"}
              value={undefined}
              hidden
              defaultValue
              />
            {brands.map((brand, k) => {
                return (
                    <RadioBtn
                    id={"brand"}
                    label={brand.Name}
                    value={brand.ID}
                    key={k}
                    onChange={()=>{errorSetter()}}/>
                    );
                })}
          </div>
          <div className="form-group mt-lg-3 col-6">
            <label>Category</label>
                <RadioBtn
                  id={"category"}
                  label={"hidden"}
                  value={undefined}
                  hidden
                  defaultValue
                  />
            {category.map((cat, k) => {
              return (
                <RadioBtn
                  id={"category"}
                  label={cat.Category}
                  value={cat.ID}
                  key={k}
                onChange={()=>{errorSetter()}}/>
              );
            })}
          </div>
        </div>
        {error && (
          <div className="col-12 bg-danger-subtle py-1 rounded text-danger d-flex justify-content-center mt-2">
            {error}
          </div>
        )}
        <button className="btn btn-success col-12 mt-1" disabled={isDisabled}>submit</button>
      </form>
    </>
  );
};

const RadioBtn = ({ id, value, label, onChange, hidden, defaultValue }) => {
  return (
    <div>
      <input type="radio" name={id} id={id} value={value} className="m-1" onChange={onChange} hidden={hidden} defaultChecked={defaultValue}/>
      <label hidden={hidden}>{label}</label>
    </div>
  );
};

export default AddProduct;
