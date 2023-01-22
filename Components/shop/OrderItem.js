import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import CartItem from "../shop/CartItem";
import Colors from "../../Constants/Colors";
import Ordereditems from "./OrderedItems";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styels.orderitem}>
      <View style={styels.summary}>
        <Text style={styels.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styels.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title= {!showDetails ? "Show Details" : "Hide Details"}
        onPress={()=> {setShowDetails(previousState => !previousState)}}
      />
      {showDetails && (
        <View style={styels.itemsDetails}> 
          {props.items.map((cartItem) => (
            <Ordereditems
            key={cartItem.productId}
              title={cartItem.productTitle}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styels = StyleSheet.create({
  orderitem: {
    shadowColor: "black",
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },

  summary: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "boldFont",
    fontSize: 16,
  },
  date: {
    fontFamily: "regularFont",
    fontSize: 16,
    color: "#888",
  },
  itemsDetails : {
    width :'100%'
  }
});

export default OrderItem;
