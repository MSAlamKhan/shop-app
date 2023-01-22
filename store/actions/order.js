import Order from "../../Models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, Totalamount) => {
  return async (dispatch,getState) => {
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId
    const response = await fetch(
      `https://shopping-app-ae2fa-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          Totalamount,
          date: date.toISOString(),
        }),
      }
    );

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      cartData: {
        id: responseData.name,
        items: cartItems,
        amount: Totalamount,
        date: date,
      },
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch,getState) => {
    const userId = getState().auth.userId
    const response = await fetch(
   
      `https://shopping-app-ae2fa-default-rtdb.firebaseio.com/orders/${userId}.json`
    );

    const responseData = await response.json();
    let loadedOrders = [];
    for (const key in responseData) {
      loadedOrders.push(
        new Order(
          key,
          responseData[key].cartItems,
          responseData[key].Totalamount,
          new Date(responseData[key].date)
        )
      );
    }
    dispatch({ type: SET_ORDERS, orders: loadedOrders });
  };
};