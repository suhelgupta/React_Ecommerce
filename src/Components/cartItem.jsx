import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import FormatPrice from "../Helper/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setCount } from "../redux/cartSlice";


const CartItem = (props) => {
  const [count,setProductCount] = useState(0)
  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);

    useEffect(() => {
        if(cart && cart.length > 0){
        let product = cart.find(x=>x.id === props.id)
        if(product){
            setProductCount(product.count)
        }
        }
    },[setProductCount,cart,props.id]);

  const incrementCount = () =>{
      setProductCount(count + 1)
      dispatch(setCount({id:props.id,count:count+1}))
  };

  const decrementCount= () =>{
      if(count>0){
      setProductCount(count - 1)
      dispatch(setCount({id:props.id,count:count-1}))
      }
  };

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={props.imgURL} alt={props.productName} />
          </figure>
        </div>
        <div>
          <p>{props.productName}</p>
        </div>
      </div>
      {/* price   */}
      <div >
        <p>
          <FormatPrice price={props.productPrice} />
        </p>
      </div>

      {/* Quantity  */}
        <div>
            <button className="btn btn-primary" onClick={decrementCount} >-</button> &nbsp;
            <span>{count}</span> &nbsp;
            <button className="btn btn-primary" onClick={incrementCount} >+</button>
        </div>

      {/* //Subtotal */}
      <div >
        <p>
          <FormatPrice price={props.productPrice * count} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => dispatch(removeItem(props.id))} />
      </div>
    </div>
  );
};

export default CartItem;
