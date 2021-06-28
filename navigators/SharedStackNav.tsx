import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { RootStackParamList } from "../types/screen";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import useMe from "../hooks/useMe";
import { logUserOut } from "../apollo";
import CoffeeShopScreen from "../screens/CoffeeShopScreen";
import UploadNav from "./UploadNav";

const Stack = createStackNavigator();

interface ISharedStackNav {
  screenName: keyof RootStackParamList;
}

export default function SharedStackNav({ screenName }: ISharedStackNav) {
  const { data } = useMe();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen name={"Home"} component={Home} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Upload" ? (
        <Stack.Screen name={"Upload"} component={UploadNav} />
      ) : null}
      {screenName === "Profile" ? (
        <Stack.Screen name={"Profile"}>
          {props => <Profile {...props} username={data?.me?.username} isMe />}
        </Stack.Screen>
      ) : null}
      <Stack.Screen name={"CoffeeShopScreen"} component={CoffeeShopScreen} />
    </Stack.Navigator>
  );
}
