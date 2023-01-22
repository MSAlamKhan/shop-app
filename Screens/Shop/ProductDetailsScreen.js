import React, { useLayoutEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../Constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailsScreen = (props) => {
  const pID = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.avaliableProducts.find((prod) => prod.id === pID)
  );
  const totalamount = useSelector(state =>  state.cart.totalAmount)
  const Dispatch = useDispatch();

  const headerConfig = () => {
    props.navigation.setOptions({
      title: selectedProduct.title,
    });
  };
  useLayoutEffect(() => {
    headerConfig();
  });

  return (
    
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: selectedProduct.imageURL }}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="Add to cart"
          onPress={() => {
            Dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.priceText}>${selectedProduct.price}</Text>

      <Text style={styles.detailText}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  priceText: {
    fontFamily: "boldFont",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },

  detailText: {
    fontFamily: "regularFont",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailsScreen;
