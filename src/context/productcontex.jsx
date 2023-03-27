import { useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import reducer from "../reducer/productReducer";


const AppContext = createContext();

const AppProvider = ({ children }) => {
    const API = './allProduct.json';
    const initialState = {
        isLoading: false,
        isError: false,
        products: [],
        count:0
      };
    const [state, dispatch] = useReducer(reducer, initialState);

    const addProduct = (product) => {
      dispatch({ type: "ADD_PRODUCT", payload: { product } });
    };

    const removeProduct = (id) => {
      dispatch({ type: "REMOVE_PRODUCT", payload: id });
    };

    const updateProduct = (id,product) => {
      dispatch({ type: "UPDATE_PRODUCT", payload: {id,product} });
    };

    const fetchProduct = (url)=>{
        dispatch({ type: "SET_LOADING" });
        fetch(url).then((res)=>{
          return res.json()
        }).then((data)=>{
            dispatch({ type: "SET_API_DATA", payload: data });
        }).catch((err)=>{
            dispatch({ type: "API_ERROR" });
        })
      }
    
    useEffect(() => {
        fetchProduct(API);
    }, []);

    return (
        <AppContext.Provider value={{...state,addProduct,updateProduct,removeProduct}}>
          {children}
        </AppContext.Provider>
      );
    };

        // custom hooks
  const useProductContext = () => {
    return useContext(AppContext);
  };
    

    export { AppProvider ,useProductContext };