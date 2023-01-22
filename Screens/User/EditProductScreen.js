import React, { useReducer, useCallback, useState } from "react";
import { useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import * as productActions from "../../store/actions/product";
import CustomHeaderButton from "../../Components/UI/HeaderButton";
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

const EditProductScreen = (props) => {
  const [isLoading, setIslodaing] = useState(false);
  const [error, setError] = useState(false);
  const Dispatch = useDispatch();
  const productId = props.route.params.productId;
  const tobeEditedProduct = useSelector((state) =>
    state.products.userProducts.find((products) => products.id === productId)
  );

  useEffect(() => {
    if (error) {
      return Alert.alert("Error Occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: tobeEditedProduct ? tobeEditedProduct.title : null,
      imageURL: tobeEditedProduct ? tobeEditedProduct.imageURL : null,
      price: null,
      description: tobeEditedProduct ? tobeEditedProduct.description : null,
    },
    inputValidities: {
      title: tobeEditedProduct ? true : false,
      imageURL: tobeEditedProduct ? true : false,
      price: tobeEditedProduct ? true : false,
      description: tobeEditedProduct ? true : false,
    },
    formIsValid: tobeEditedProduct ? true : false,
  });

  const HeaderConfig = () => {
    props.navigation.setOptions({
      title: productId ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName="md-checkmark-sharp"
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  };
  useLayoutEffect(HeaderConfig);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      return Alert.alert("Invalid Values", "Pleas enter correct information", [
        { text: "OK" },
      ]);
    }
    setError(null);
    setIslodaing(true);
    try {
      let action;
      if (tobeEditedProduct) {
        action = productActions.updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.imageURL,
          formState.inputValues.description
        );
      } else {
        action = productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.imageURL,
          +formState.inputValues.price,
          formState.inputValues.description
        );
      }
      await Dispatch(action);
      props.navigation.goBack()
    } catch (error) {
      setError(error.message);
      isLoading(false);
    }
  }, [Dispatch, productId, formState]);

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
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id={"title"}
          label={"Title"}
          errorText={"Please enter a valid title"}
          keyboardType="default"
          autoCapitalize="sentences"
          onInputChange={inputChangeHandler}
          initialValue={tobeEditedProduct ? tobeEditedProduct.title : null}
          initiallyValid={!!tobeEditedProduct}
          required
        />
        <Input
          id={"imageURL"}
          label={"Image Url"}
          errorText={"Please enter a correct http address"}
          keyboardType="url"
          onInputChange={inputChangeHandler}
          initialValue={tobeEditedProduct ? tobeEditedProduct.imageURL : null}
          initiallyValid={!!tobeEditedProduct}
          required
        />
        {tobeEditedProduct ? null : (
          <Input
            id={"price"}
            label={"Price"}
            errorText={"Please enter a valid price"}
            keyboardType="decimal-pad"
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id={"description"}
          label={"Description"}
          errorText={"Please enter a clear description"}
          keyboardType="default"
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={
            tobeEditedProduct ? tobeEditedProduct.description : null
          }
          initiallyValid={!!tobeEditedProduct}
          required
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default EditProductScreen;
