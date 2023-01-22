import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/auth";

import Colors from "../Constants/Colors";
const StartUp = (props) => {
  const Dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userdata = await AsyncStorage.getItem("userData");
      if (!userdata) {
        props.navigation.navigate("AuthScreen");
        return;
      }
      const transformedData = JSON.parse(userdata);
      const { token, userId, expireTime } = transformedData;
      const expirationTime = new Date(expireTime);
      if (expirationTime <= new Date() || !token || !userId) {
        props.navigation.navigate("AuthScreen");
        return;
      }
      props.navigation.navigate("shop");
      Dispatch(AuthActions.authenticate(userId, token));
    };
    tryLogin();
  }, [Dispatch]);

  return (
    <LinearGradient
      colors={[Colors.accent, Colors.primary]}
      style={styles.screen}
    >
      <View style={styles.screen}>
        <ActivityIndicator size={"large"} color={Colors.accent} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartUp;
