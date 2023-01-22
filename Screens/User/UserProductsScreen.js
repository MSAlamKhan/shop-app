import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Button, FlatList, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../Components/shop/ProductItem";
import CustomHeaderButton from "../../Components/UI/HeaderButton";
import * as productActions from "../../store/actions/product";
import Colors from "../../Constants/Colors";

const UserProductsScreen = (props) => {
  const [error, setError] = useState(null);
  const HeaderConfig = () => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName="md-create"
            onPress={() =>
              props.navigation.navigate("Edit Products", { productId: null })
            }
          />
        </HeaderButtons>
      ),
    });
  };

  useLayoutEffect(HeaderConfig);

  useEffect(() => {
    if (error) {
      return Alert.alert("Error Occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const userProducts = useSelector((state) => state.products.userProducts);
  const Dispatch = useDispatch();

  const editProduct = (id) => {
    props.navigation.navigate("Edit Products", { productId: id });
  };

  const deletehandler = (id) => {
    setError(null);
    Alert.alert("Are you sure?", "you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        style: "destructive",
        onPress: async () => {
          try {
            await Dispatch(productActions.deletePrdouct(id));
          } catch (error) {
            setError(error.message);
          }
        },
      },
    ]);
  };
  if (userProducts.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>no products- start creating some</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageURL}
          title={itemData.item.title}
          price={itemData.item.price}
        >
          <Button
            title="Edit"
            color={Colors.primary}
            onPress={() => {
              editProduct(itemData.item.id);
            }}
          />
          <Button
            title="Delete"
            color={"red"}
            onPress={() => deletehandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text : {
  fontFamily : 'regularFont'
  ,fontSize : 20
  }
});
export default UserProductsScreen;
