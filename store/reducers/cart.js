import CartItem from "../../Models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProcduct = action.product;
      const productPrice = addedProcduct.price;
      const productTitle = addedProcduct.title;

      if (state.items[addedProcduct.id]) {
        // alread have item in cart
        const updatedCartItem = new CartItem(
          state.items[addedProcduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProcduct.id].sum + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProcduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        return {
          //    ...state, if we dont have anoy onter state other then
          // we are updating or over riding we can skip copying are
          // preexisiting state
          items: { ...state.items, [addedProcduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      }
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.id];
      const currentQty = selectedCartItem.quantity;

      let updatedCartItems;
      
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.id]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.id];
      }
      return {
        ...state,
        items : updatedCartItems,
        totalAmount :  state.totalAmount - selectedCartItem.productPrice
      }
      case ADD_ORDER :
        return initialState
      
      case DELETE_PRODUCT:
        if (state.items[action.pid]) {
          const updatedItems = {...state.items};
          const itemTotal = state.items[action.pid].sum
          delete updatedItems[action.pid]
          return {
            ...state,
            items : updatedItems,
            totalAmount : state.totalAmount - itemTotal
          }
        }
        else {
          return state
        }

    default:
      return state;
  }
};

export default cartReducer;
