import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";



const CustomHeaderButton = (props) => {
  return <HeaderButton {...props} IconComponent={Ionicons} 
  iconSize={30} color={Colors.accent} 
  />;
};

export default CustomHeaderButton
