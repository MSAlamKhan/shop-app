import { AsyncStorage } from "react-native";

// export const SIGN_UP = "SIGN_UP";
// export const LOG_IN = "LOG_IN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const signUp = (email, password) => {
  return async (dispatch) => {

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCffL05rZeFc4OFgkJXK1y3mmCQGtoyBm0",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      switch (responseError.error.message) {
        case "MISSING_EMAIL":
          throw new Error("please enter your email");
        case "MISSING_PASSWORD":
          throw new Error("please enter your password");
        case "EMAIL_EXISTS":
          throw new Error("email address registered, try another email");
        case "INVALID_PASSWORD":
          throw new Error("please enter correct password");
        default:
          break;
      }
    }

    const responseData = await response.json();
    console.log(responseData);
    dispatch(authenticate(responseData.localId, responseData.idToken));
    const expirationTime = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );
    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationTime
    );
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCffL05rZeFc4OFgkJXK1y3mmCQGtoyBm0",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const responseError = await response.json();
      switch (responseError.error.message) {
        case "MISSING_EMAIL":
          throw new Error("please enter your email");
        case "MISSING_PASSWORD":
          throw new Error("please enter your password");
        case "EMAIL_NOT_FOUND":
          throw new Error("Account please check email address");
        case "INVALID_PASSWORD":
          throw new Error("please enter correct password");
        default:
          break;
      }
    }

    const responseData = await response.json();
    console.log(responseData);
    dispatch(authenticate(responseData.localId, responseData.idToken));
    const expirationTime = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );
    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationTime
    );
  };
};
export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
const saveDataToStorage = (token, userId, expireTime) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expireTime: expireTime.toISOString(),
    })
  );
};
