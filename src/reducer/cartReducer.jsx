const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
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
  }

  // to set the increment and decrement
  if (action.type === "SET_COUNT") {
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
  }

  if (action.type === "REMOVE_ITEM") {
      let updatedCart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };
  }

  // to empty or to clear to cart
  if (action.type === "CLEAR_CART") {
      return {
        ...state,
        cart: [],
      };
  }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
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

  return state;
};

export default cartReducer;

