import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Button,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../Components/shop/ProductItem";
import CustomHeaderButton from "../../Components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/product";
import Colors from "../../Constants/Colors";
import { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";

const ProductOverViewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const HeadeConfig = () => {
    props.navigation.setOptions({
      title: "All Products",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName="md-cart"
            onPress={() => props.navigation.navigate("Cart")}
          />
        </HeaderButtons>
      ),
    });
  };

  useLayoutEffect(() => HeadeConfig());

  const products = useSelector((state) => state.products.avaliableProducts);
  const Dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    await Dispatch(productActions.fetchProducts());
    setIsRefreshing(false);
  }, [Dispatch, setIsLoading]);

  useEffect(() => {
    const focusSub = props.navigation.addListener("focus", loadProducts);

    return () => {
      focusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [Dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isLoading}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageURL}
          title={itemData.item.title}
          price={itemData.item.price}
        >
          <Button
            color={Colors.primary}
            title="Add to cart"
            onPress={() => {
              Dispatch(cartActions.addToCart(itemData.item));
            }}
          />
          <Button
            color={Colors.primary}
            title="Details"
            onPress={() => {
              props.navigation.navigate("Details", {
                productId: itemData.item.id,
              });
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductOverViewScreen;
