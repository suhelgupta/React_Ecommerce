import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item:"",
  total_price: "",
  shipping_fee: 500,
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, products) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, products } });
  };

  // increment and decrement the product
  const setCount = (id,count) => {
    dispatch({ type: "SET_COUNT", payload: {id,count} });
  };

  // to remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };


  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
  }, [cartState.cart]);

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        addToCart,
        removeItem,
        clearCart,
        setCount,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
