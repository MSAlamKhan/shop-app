import Product from "../../Models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      "https://shopping-app-ae2fa-default-rtdb.firebaseio.com/products.json"
    );

    const responseData = await response.json();
    let loadedProducts = [];
    for (const key in responseData) {
      loadedProducts.push(
        new Product(
          key,
          responseData[key].ownerId,
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price
        )
      );
    }
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
    });
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shopping-app-ae2fa-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerId: userId,
          title,
          imageUrl,
          price,
          description,
        }),
      }
    );

    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        ownerId: userId,
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
      },
    });
  };
};

export const deletePrdouct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shopping-app-ae2fa-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    const responseData = await response.json();
    if (responseData != null) {
      if (!responseData.ok) {
        throw new Error("something went wrong");
        
      }
    }
    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shopping-app-ae2fa-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      }
    );

    const responseData = await response.json();
    if (!responseData.ok) {
      throw new Error("something went wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title: title,
        imageUrl: imageUrl,
        description: description,
      },
    });
  };
};
