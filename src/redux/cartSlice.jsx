import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        total_item:0,
        total_price: 0,
        shipping_fee: 500,
    },
    reducers: {
        addToCart : (state,action)=>{
            let { id, products } = action.payload;
            let existingProduct = state.cart.find((curItem) => curItem.id === id);
        
            if (existingProduct) {
            } else {
              let product = products.find((x) => x.id === id);
              let cartProduct = {
                ...product,
                count: 1,
              };
        
              return {
                ...state,
                cart: [...state.cart, cartProduct],
              };
            }
    
        },
        setCount : (state,action)=>{
            let { id, count } = action.payload;
            if (count === 0) {
            let updatedCart = state.cart.filter(
                (curItem) => curItem.id !== id
            );
            return {
                ...state,
                cart: updatedCart,
            };
            }
            let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === id) {
                return {
                ...curElem,
                count: count,
                };
            } else {
                return curElem;
            }
            });
            return { ...state, cart: updatedProduct };

        },
        removeItem : (state,action)=>{
            let updatedCart = state.cart.filter(
                (curItem) => curItem.id !== action.payload
              );
              return {
                ...state,
                cart: updatedCart,
              };
        },
        clearCart: (state,action)=>{
            return {
                ...state,
                cart: [],
              };
        },
        cartItemTotalPrice: (state,action)=>{
            let { total_item, total_price } = state.cart.reduce(
                (accum, curElem) => {
                  let { productPrice, count } = curElem;
                  accum.total_item += count;
                  accum.total_price += productPrice * count;
                  return accum;
                },
                {
                  total_item: 0,
                  total_price: 0,
                }
              );
              return {
                ...state,
                total_item,
                total_price,
              };
        }
    }
  })

export const {addToCart,setCount,removeItem,clearCart,cartItemTotalPrice} = cartSlice.actions

export default cartSlice