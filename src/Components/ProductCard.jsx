import { useState, useEffect } from "react";
import FormatPrice from "../Helper/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCount } from "../redux/cartSlice";

function ProductCard(props) {
  const [count, setProductCount] = useState(0);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart && cart.length > 0) {
      let product = cart.find((x) => x.id === props.id);
      if (product) {
        setProductCount(product.count);
      }
    }
  },[setProductCount,cart,props.id]);

  const incrementCount = () => {
    setProductCount(count + 1);
    dispatch(setCount({id:props.id,count:count+1}))
  };

  const decrementCount = () => {
    if (count > 0) {
      setProductCount(count - 1);
      dispatch(setCount({id:props.id,count:count-1}))
    }
  };

  return (
    <>
      <div className="card mb-5 me-4" style={{width: '14rem'}}>
        <img src={props.imgURL} alt={props.productName} style={{width: '14rem',height:'10rem'}} className="card-img-top"  />
        <div className="card-body">
          <h5 className="card-title">{props.productName}</h5>
          <p className="card-text">{props.productDescription}</p>
          <h6 className="card-title">{<FormatPrice price={props.productPrice }/>}</h6>
          {count === 0 && <button className="btn btn-success" onClick={()=> {dispatch(addToCart({id:props.id,products:products}))}}>Add to Cart</button>}
          {count > 0 && <><button className="btn btn-success" onClick={decrementCount} >-</button> &nbsp;
          <span>{count}</span> &nbsp;
          <button className="btn btn-success" onClick={incrementCount} >+</button></>}
        </div>
      </div>
    </>
  );
}


export default ProductCard;
