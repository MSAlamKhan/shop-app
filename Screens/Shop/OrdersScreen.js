import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../Constants/Colors";
import OrderItems from "../../Components/shop/OrderItem";
import * as OrderActions from "../../store/actions/order";

import CustomHeaderButton from "../../Components/UI/HeaderButton";

const OrdersScreen = (props) => {
  const Dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    await Dispatch(OrderActions.fetchOrders());
    setIsLoading(false);
  }, [Dispatch, setIsLoading]);
  useEffect(() => {
    loadOrders();
  }, [Dispatch]);

  const HeaderConfig = () => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            onPress={() => props.navigation.openDrawer()}
          />
        </HeaderButtons>
      ),
    });
  };
  useLayoutEffect(HeaderConfig);
  const orders = useSelector((state) => state.orders.orders);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>no orders- start ordering</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItems
          amount={itemData.item.amount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "regularFont",
    fontSize: 20,
  },
});
export default OrdersScreen;
