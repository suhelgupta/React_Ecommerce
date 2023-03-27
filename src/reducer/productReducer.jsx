const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        count:action.payload.length
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "ADD_PRODUCT":
      let Product = {
        ...action.payload.product,
        id : state.count + 1
      };

      return {
        ...state,
        products: [...state.products,Product],
        count:state.count + 1
      };

    case "REMOVE_PRODUCT":
      let updatedCart = state.products.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        products: updatedCart,
      };

    case "UPDATE_PRODUCT":
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

    default:
      return state;
  }
};

export default productReducer;
