import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import AppLoading from "expo-app-loading";
import reduxThunk from "redux-thunk";
import * as Fonts from "expo-font";

import productReducer from "./store/reducers/product";

import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import AuthNavigator from "./Navigation/ShopNavigator";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const fetchFonts = () => {
  return Fonts.loadAsync({
    regularFont: require("./assets/Fonts/OpenSans-Regular.ttf"),
    boldFont: require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // SplashScreen.preventAutoHideAsync();
  // const [fontLoaded] = useFonts(
  //   {
  //     'regularFont' : require('./assets/Fonts/OpenSans-Regular.ttf'),
  //   'boldFont' : require('./assets/Fonts/OpenSans-Bold.ttf')
  //   }
  // )

  // const onLayoutRootView = useCallback(async () =>{
  //   if (fontLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontLoaded])
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }
  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
}
