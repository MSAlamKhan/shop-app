import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Button, SafeAreaView } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../Constants/Colors";
import ProductDetailsScreen from "../Screens/Shop/ProductDetailsScreen";
import CartScreen from "../Screens/Shop/CartScreen";
import ProductOverViewScreen from "../Screens/Shop/ProductOverViewScreen";
import OrdersScreen from "../Screens/Shop/OrdersScreen";
import CustomHeaderButton from "../Components/UI/HeaderButton";
import UserProductsScreen from "../Screens/User/UserProductsScreen";
import EditProductScreen from "../Screens/User/EditProductScreen";
import AuthScreen from "../Screens/User/AuthScreen";
import StartUp from "../Screens/StartUp";
import * as AuthActions from "../store/actions/auth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ShopStack = ({ navigation: drawerNavOptions }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },

          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "boldFont",
          },
        }}
      >
        <Stack.Screen
          name="Products OverView"
          component={ProductOverViewScreen}
          options={{
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="md-menu"
                  onPress={() => drawerNavOptions.openDrawer()}
                />
              </HeaderButtons>
            ),
          }}
        />
        <Stack.Screen name="Details" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const UserStack = ({ navigation: drawerNavOptions }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="User"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },

          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "boldFont",
          },
        }}
      >
        <Stack.Screen
          name="Your Products"
          component={UserProductsScreen}
          options={{
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="md-menu"
                  onPress={() => drawerNavOptions.openDrawer()}
                />
              </HeaderButtons>
            ),
          }}
        />
        <Stack.Screen name="Edit Products" component={EditProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        useLegacyImplementation
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          drawerActiveTintColor: Colors.primary,
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "boldFont",
          },
        }}
      >
        <Drawer.Screen
          name="Shop"
          component={ShopStack}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <Ionicons
                name={"md-cart-sharp"}
                size={23}
                color={Colors.primary}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            drawerIcon: () => (
              <Ionicons name={"md-list"} size={23} color={Colors.primary} />
            ),
          }}
        />
        <Drawer.Screen
          name="Admin"
          component={UserStack}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <Ionicons name={"md-create"} size={23} color={Colors.primary} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const AuthNavigator = () => {
  const isSignedIn = useSelector((state) => state.auth.token);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },

          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "boldFont",
          },
        }}
      >
        {isSignedIn ? (
          <Stack.Screen
            name="shop"
            options={{ headerShown: false }}
            component={MainNavigator}
          />
        ) : (
          <>
            <Stack.Screen
              name="Startup"
              component={StartUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AuthScreen"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const CustomDrawerContent = (props) => {
  const Dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label={"Logout"}
        onPress={() => {}}
        labelStyle={{ fontFamily: "regularFont", fontSize: 14 }}
        icon={() => (
          <Ionicons name={"md-log-out"} size={23} color={Colors.primary} />
        )}
      /> */}
      <SafeAreaView
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flex: 1,
          paddingTop: 10,
        }}
      >
        <Button
          title="logout"
          color={Colors.primary}
          onPress={() => {
            Dispatch(AuthActions.logout());
            props.navigation.navigate("AuthScreen");
          }}
        />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};
export default AuthNavigator;
