import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../../Constants/Colors";

const Ordereditems = (props) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.amount}>${props.amount.toFixed(2)} </Text>
      </View>

  );
};

const styles = StyleSheet.create({
  cartItem: {
    margin: 5,
    flexDirection: "row",
    padding: 10,
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

export default Ordereditems;
