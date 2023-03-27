import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from '../ApiCalls';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        isError: false,
        products: [],
        singleProduct:{   
          id: 0,
          imgURL: "",
          productName: "",
          productDescription: "",
          productPrice: 0
        },
        count:0
    },
    reducers: {
        addProduct : (state,action)=>{
            let Product = {
                ...action.payload,
                id : state.count + 1
              };
        
              return {
                ...state,
                products: [...state.products,Product],
                count:state.count + 1
              };
    
        },
        removeProduct : (state,action)=>{
            let updatedCart = state.products.filter(
                (product) => product.id !== action.payload
              );
              return {
                ...state,
                products: updatedCart,
              };

        },
        updateProduct : (state,action)=>{
            let { id, product } = action.payload;
            let updatedProduct = state.products.map((prod) => {
                if (prod.id === id) {
                return {
                    ...product
                };
                } else {
                return prod;
                }
            });
            return { ...state, products: updatedProduct };
        },
        setSingleProduct : (state,action)=>{
            let id = action.payload;
            let singleProduct = state.products.find((x)=>x.id === id)
            return { ...state, singleProduct: singleProduct };
        },
        removeSingleProduct : (state,action)=>{
            return { ...state, singleProduct: {} };
        },
    },
    extraReducers:{
      [fetchProducts.pending]:(state)=>{
        state.isLoading = true;
        state.isError = false;
      },
      [fetchProducts.fulfilled]:(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload;
        state.count = action.payload.length
      },
      [fetchProducts.rejected]:(state,action)=>{
        state.isLoading = false;
        state.isError = true;
      }
    }
    
  })

export const {addProduct,updateProduct,removeProduct,setSingleProduct,removeSingleProduct} = productSlice.actions

export default productSlice