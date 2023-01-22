import { AsyncStorage } from "react-native";
import { AUTHENTICATE, LOG_IN, LOG_OUT, SIGN_UP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOG_OUT:
      AsyncStorage.clear()
      return initialState;
    // case LOG_IN:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // case SIGN_UP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    default:
      return state;
  }
};

export default authReducer;
