import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTrash,FaEdit } from "react-icons/fa";
import FormatPrice from "../Helper/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, removeSingleProduct, setSingleProduct } from "../redux/productSlice";
import { useEffect } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const products  = useSelector((state) => state.product.products);;

  let navigate = useNavigate();

  useEffect(()=>{
    dispatch(removeSingleProduct())
  },[])

  function setProduct(id){
    if(id > 0){
      dispatch(setSingleProduct(id))
    }
    navigate(`/products/${id}`)
  }

  return (
    <div className="container mt-5">
      <NavLink to={'/products/0'}>
        <button className="btn btn-success mb-3">Add Product</button>
      </NavLink>
      <div className="row mb-3 text-center">
        <div className="col-2 ">image</div>
        <div className="col-2 ">name</div>
        <div className="col-4 ">Description</div>
        <div className="col-2 ">price</div>
        <div className="col-2 ">Action</div>
      </div>
    <hr />
      {products &&
        products.map((product) => {
          return (
            <div  className="row mt-3 text-center product-item-box">
              <div className="col-2 ">
                <img src={product.imgURL} className="img-thumbnail" alt="..." />
              </div>
              <div className="col-2">{product.productName}</div>
              <div className="col-4 ">{product.productDescription}</div>
              <div className="col-2"><FormatPrice price={product.productPrice} /></div>
              <div className="col-2 ">
              <span className="text-primary" onClick={() => dispatch(removeProduct(product.id))}>
                  <FaTrash className="icon red-icon"  onClick={() => {}} />
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="text-primary" onClick={() => setProduct(product.id)}>
                  < FaEdit className="icon" />
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
