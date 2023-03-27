import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../redux/productSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const singleProduct  = useSelector((state) => state.product.singleProduct);
  const [formState, setFormState] = useState({
    id: 0,
    imgURL: "",
    productName: "",
    productDescription: "",
    productPrice: 0,
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(()=>{
    if(singleProduct && singleProduct.id>0){
      setFormState({
        ...singleProduct
      })
    }
  },[setFormState,singleProduct])

  const handleSubmit = (e) => {
    if(formState.id > 0){
      dispatch(updateProduct({id:formState.id,product:formState}))
    }
    if(formState.id === 0){
      dispatch(addProduct(formState))
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          product Name
        </label>
        <input
          type="text"
          name="productName"
          onChange={handleInput}
          value={formState.productName}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="product Name"
        />
      </div>
      <div className="mb-3 row ">
        <div className="col-10">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Image Link
          </label>
          <input
            type="text"
            name="imgURL"
            onChange={handleInput}
            value={formState.imgURL}
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="past Image Link"
          />
        </div>
        <div className="col-1"></div>
        <div className="col-1">
        {formState.imgURL && <img src={formState.imgURL} className="img-thumbnail" alt="..." />}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea3" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          name="productDescription"
          onChange={handleInput}
          value={formState.productDescription}
          id="exasmpleFormControlTextarea3"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput4" className="form-label">
          Price
        </label>
        <input
          type="number"
          name="productPrice"
          onChange={handleInput}
          value={formState.productPrice}
          className="form-control"
          id="exampleFormControlInput4"
          placeholder="Price"
        />
      </div>
      <br />
      <NavLink to={'/products'}>

      <button className="btn btn-primary" onClick={handleSubmit} type="submit">
        {formState.id === 0 ? "Add" : "Update"}
      </button>
      </NavLink>
    </div>
  );
};

export default Product;
