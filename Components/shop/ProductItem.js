import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";


const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        <Text style={styles.priceStyle}>$ {props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonsRow}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  titleStyle: {
    fontSize: 18,
    fontFamily: "boldFont",
    marginVertical: 4,
  },
  priceStyle: {
    fontFamily: "regularFont",
    fontSize: 14,
    color: "#888",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "25%",
  },

  titleContainer: {
    alignItems: "center",
    height: "15%",
    padding: 5,
  },
});

export default ProductItem;
