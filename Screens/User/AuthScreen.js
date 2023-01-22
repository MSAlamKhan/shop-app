import React, {
  useLayoutEffect,
  useReducer,
  useCallback,
  useState,
} from "react";
import {
  ActivityIndicator,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import * as AuthActions from "../../store/actions/auth";
import Input from "../../Components/UI/Input";
import Colors from "../../Constants/Colors";
import { useEffect } from "react";

const FORM_UPDATE = "UPDATE";

//this is reducer Function
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updateValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let formIsComplete = true;
      for (const key in updatedValidities) {
        formIsComplete = formIsComplete && updatedValidities[key];
      }
      return {
        inputValues: updateValues,
        inputValidities: updatedValidities,
        formIsValid: formIsComplete,
      };

    default:
      return state;
  }
};

const AuthScreen = (props) => {
  const Dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authHandler = async () => {
    if (isSignup) {
      setError(null);
      setIsLoading(true);
      try {
        await Dispatch(
          AuthActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        await Dispatch(
          AuthActions.logIn(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  };

  const { navigation } = props;

  const headerConfig = () => {
    navigation.setOptions({
      title: "Shop App",
    });
  };

  useEffect(() => {
    if (error) {
      return Alert.alert("Error Occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: null,
      password: null,
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useLayoutEffect(headerConfig);

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient
        colors={[Colors.accent, Colors.primary]}
        style={styles.gradient}
      >
        <View style={styles.card}>
          <ScrollView>
            <View style={{ alignItems: "center", padding: 5 }}>
              <Text
                style={{
                  fontFamily: "boldFont",
                  fontSize: 18,
                  color: Colors.primary,
                }}
              >
                {isSignup ? "Signup" : "Login"}
              </Text>
            </View>
            <Input
              id={"email"}
              label={"E-mail"}
              keyboardType={"email-address"}
              required
              email
              autoCapitalize="none"
              errorText={"Enter a valid Email address"}
              onInputChange={inputChangeHandler}
            />
            <Input
              id={"password"}
              label={"Password"}
              keyboardType={"default"}
              required
              secureTextEntry
              autoCapitalize="none"
              errorText={"Enter a valid password"}
              onInputChange={inputChangeHandler}
            />
            {isLoading ? (
              <View style={styles.spinner}>
                <ActivityIndicator size={"large"} color={Colors.accent} />
              </View>
            ) : (
              <View style={styles.buttons}>
                <Button
                  title={isSignup ? "Signup" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
                <Button
                  title={`Switch to ${isSignup ? "Login" : "SignUp"}`}
                  color={Colors.accent}
                  onPress={() => {
                    setIsSignup((prevValue) => !prevValue);
                  }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  card: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    margin: 5,
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "black",
    elevation: 5,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  spinner: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AuthScreen;
