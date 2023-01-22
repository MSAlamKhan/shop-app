import PRODUCTS from "../../Data/dummy-data";
import Product from "../../Models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/product";

const initialState = {
  avaliableProducts: [],
  userProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        avaliableProducts: action.products,
        userProducts: action.userProducts,
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        avaliableProducts: state.avaliableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const availableProductIndex = state.avaliableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[userProductIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[userProductIndex].price
      );
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[userProductIndex] = updatedProduct;
      const updatedAvaliableProduct = [...state.avaliableProducts];
      updatedAvaliableProduct[availableProductIndex] = updatedProduct;
      return {
        ...state,
        avaliableProducts: updatedAvaliableProduct,
        userProducts: updatedUserProduct,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        avaliableProducts: state.avaliableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
