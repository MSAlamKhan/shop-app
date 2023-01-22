import Order from "../../Models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/order";

const initialState = {
    orders : []
}

const ordersReducer = (state =initialState, action) =>{
    switch (action.type) {
        case SET_ORDERS:
            return{
                orders : action.orders
            }
        case ADD_ORDER:
        const newOrder = new Order(
            action.cartData.id,
            action.cartData.items,
            action.cartData.amount,
            action.cartData.date
        )
        return {
            ...state,
            orders : state.orders.concat(newOrder)
        }
    
        default:
            return state
    }

}

export default ordersReducer;