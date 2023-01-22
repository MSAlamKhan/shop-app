import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../../Constants/Colors";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.leadingData}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.quantity}>Qty: {props.quantity}</Text>
      </View>
      <View style={styles.trailingData}>
        <Text style={styles.amount}>${props.amount.toFixed(2)} </Text>
        <TouchableOpacity onPress={props.onRemove}>
          <Ionicons name="md-trash" size={23} color={"red"} style={{paddingHorizontal :10}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    margin: 10,
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "black",
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leadingData: {
    marginVertical :10,
  },
  trailingData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    textAlign : "justify",
    fontFamily: "boldFont",
    fontSize:  13,
  },
  quantity : {
    fontFamily : 'regularFont',
    fontSize : 12,
    color :'#888'
  },
  amount : {
    fontFamily : 'regularFont',
    fontSize : 15,
    color : Colors.accent
  }
});

export default CartItem;
